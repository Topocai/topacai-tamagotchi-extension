import {
  animations_map as animations,
  states_map as states_animations,
} from "./animations.js";

import {
  tamagotchiState,
  updateAndBroadcast,
  resetFrameLoop,
} from "./stateManager.js";

import { addStats } from "./statsManager.js";

import {
  setCooldown,
  createCooldown,
  CheckCooldown,
} from "./cooldownManager.js";

import { Actions } from "./actions.js";

/**
 * Returns the current frame of the cat animation, based on the
 * current state and action. If there is an action, uses the action
 * animation, otherwise uses the state animation.
 *
 * @returns {string} The current frame of the cat animation
 */
export const getCurrentFrame = () => {
  return animations[
    tamagotchiState.action ? tamagotchiState.action : tamagotchiState.state
  ][tamagotchiState.frame];
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
