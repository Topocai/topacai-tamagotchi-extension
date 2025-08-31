import {
  animations_map as animations,
  states_map as states_animations,
} from "./animations.js";

import {
  tamagotchiState,
  updateAndBroadcast,
  resetFrameLoop,
} from "./stateManager.js";

import {
  addStats,
  HUNGRY_LOST_PER_SECOND,
  HAPPINESS_LOST_PER_SECOND,
  SLEEP_LOST_PER_SECOND,
  SLEEP_RECOVER_PER_SECOND,
  tamagotchiStats,
  STAT_LOW_NOTIFICATION,
  STAT_CRITICAL_VALUE,
} from "./statsManager.js";

import {
  setCooldown,
  createCooldown,
  CheckCooldown,
} from "./cooldownManager.js";

import { LowStatNotificators } from "./definitions.js";
import { Actions } from "./actions.js";

/**
 * Returns the current frame of the cat animation, based on the
 * current state and action. If there is an action, uses the action
 * animation, otherwise uses the state animation.
 *
 * @returns {string} The current frame of the cat animation
 */
export const getCurrentFrame = () => {
  const animationSet =
    animations[
      tamagotchiState.action ? tamagotchiState.action : tamagotchiState.state
    ];

  if (tamagotchiState.frameMax > animationSet.length) {
    tamagotchiState.frameMax = animationSet.length;
    tamagotchiState.frame = tamagotchiState.frame % tamagotchiState.frameMax;
    updateAndBroadcast({ ...tamagotchiState });
  }
  return animationSet[tamagotchiState.frame];
};

/**
 * Performs a given cat action, stopping any current state animation and
 * waiting for the action animation to finish before resuming the state
 * animation.
 *
 * @param {string} action - The action to perform
 * @param {number} [speed=1] - The speed at which to perform the action
 *
 * @returns {Object} The updated tamagotchi state
 */
export const performAction = async (action, speed = 1) => {
  const actionInfo = Actions[action];
  let inCooldown = false;

  if (actionInfo) {
    inCooldown = await CheckCooldown(actionInfo.type);

    if (!inCooldown) {
      if (actionInfo.cooldown)
        await setCooldown(createCooldown(actionInfo.type, actionInfo.cooldown));

      addStats(actionInfo.recover);
    }
  }

  // Reset frame loop to zero to avoid faster update in first frame
  resetFrameLoop(speed);

  const actionName = inCooldown ? `cooldown_${action}` : action;

  return updateAndBroadcast({
    frame: 0,
    action: inCooldown ? `cooldown_${action}` : action, // if the action is on cooldown displays the cooldown animation
    frameMax: animations[actionName].length,
  });
};

export const setState = (state) => {
  const speed = state.speed || 1;
  resetFrameLoop(speed);
  return updateAndBroadcast({ ...state });
};

export const switchSleep = () => {
  return setState({
    state: tamagotchiState.state === "sleeping" ? "idle" : "sleeping",
  });
};

/**
 * **DEBUG METHOD**
 * Switches to the next state in the states map, and updates the displayed cat.
 *
 * @function
 */
export const NextState = () => {
  const newState =
    Object.keys(states_animations)[
      (Object.keys(states_animations).indexOf(tamagotchiState.state) + 1) %
        Object.keys(states_animations).length
    ];
  return setState({ state: newState });
};

/**
 * Tries to send a message to the content script of the active tab, in order
 * to show the cat on the page.
 * @param {number} duration - The duration in milliseconds to show the cat.
 */
const TryShowOnPage = (duration) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "SHOW_CAT",
        duration,
      });
    }
  });
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== "gameLoop") return;

  const prevStats = { ...tamagotchiStats };

  addStats({
    hungry: -HUNGRY_LOST_PER_SECOND,
    happiness: -HAPPINESS_LOST_PER_SECOND,
    sleep:
      tamagotchiState.state === "sleeping"
        ? SLEEP_RECOVER_PER_SECOND
        : -SLEEP_LOST_PER_SECOND,
  });

  // Check if any of the stats are low and notify the user showing on the current page

  let criticalStatCount = 0;

  Object.keys(prevStats).forEach((stat) => {
    const action = LowStatNotificators[stat];

    const statIsCritical = tamagotchiStats[stat] <= STAT_CRITICAL_VALUE[stat];

    if (statIsCritical) criticalStatCount++;

    const allStatsAreCritical =
      criticalStatCount >= Object.keys(tamagotchiStats).length;

    // If all stats are critical set critical state or reset to idle if not
    if (
      allStatsAreCritical &&
      tamagotchiState.state !== "critical" &&
      tamagotchiState.state !== "sleeping"
    ) {
      setState({ state: "critical", speed: 1 });
      return;
    } else if (!allStatsAreCritical && tamagotchiState.state === "critical") {
      setState({ state: "idle", speed: 1 });
    }

    // Notify when a stat is low
    if (
      prevStats[stat] > STAT_LOW_NOTIFICATION[stat] &&
      tamagotchiStats[stat] <= STAT_LOW_NOTIFICATION[stat]
    ) {
      performAction(action.payload.action, action.payload.speed);
      TryShowOnPage(6000);
    }

    // Update the state with the current critical stat (even if another one is critical, the new one will be setted)
    if (prevStats[stat] > STAT_CRITICAL_VALUE[stat] && statIsCritical) {
      setState({ state: action.payload.action, speed: action.payload.speed });
      TryShowOnPage(5000);
    }
  });
});
