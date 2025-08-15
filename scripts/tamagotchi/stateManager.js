import { startFrameLoop } from "./gameLoop.js";
// Universal and current tamagotchi state
// Here all persistent data will be stored
export let tamagotchiState = {
  state: "idle",
  action: null,

  frame: 0,
  frameMax: 3,
};

export let tamagotchiStats = {
  hungry: 0,
  happiness: 0,
  sleep: 0,
};

const HUNGRY_LOST_PER_SECOND = 100 / (60 * 5);
const HAPPINESS_LOST_PER_SECOND = 100 / (60 * 5);
const SLEEP_LOST_PER_SECOND = 100 / (60 * 5);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== "gameLoop") return;

  // losts 100 points of hungry in 20 minutes, recovers 33 points for each eat interaction, with 2.5 minutes cooldown
  // losts 100 points of happiness in 60 minutes, recovers 18 points for each pet interaction, with 1.5 minutes cooldown
  // losts 100 points of sleep in 180 minutes, recovers 100 points in 60 minutes if it is sleeping

  tamagotchiStats.hungry -= HUNGRY_LOST_PER_SECOND;
  tamagotchiStats.happiness -= HAPPINESS_LOST_PER_SECOND;
  tamagotchiStats.sleep -= SLEEP_LOST_PER_SECOND;

  chrome.storage.local.set({ tamagotchiStats });
});

export const loadData = () => {
  chrome.storage.local.get(["tamagotchiState", "tamagotchiStats"], (data) => {
    updateAndBroadcast({ ...(data.tamagotchiState || tamagotchiState) });
    tamagotchiStats = data.tamagotchiStats || tamagotchiStats;
  });
};

export const getStats = () => tamagotchiStats;

export const setStats = (stats) => {
  const { hungry, happiness, sleep } = stats;

  tamagotchiStats = { ...tamagotchiStats, hungry, happiness, sleep };

  chrome.storage.local.set({ tamagotchiStats });
};

/**
 * Creates an interval that updates the tamagotchi animation in a specific speed
 * and reset previous interval if it exists, util to prevent earlier updates when
 * changing animation
 *
 * @param {number} [speed=1] - The speed at which the animation should be updated
 */
export const resetFrameLoop = (speed = 1) => {
  // tried to mute the frame loop error message when nobody service worker is inactive but I cant
  startFrameLoop(() => {
    updateAndBroadcast({
      frame: (tamagotchiState.frame + 1) % tamagotchiState.frameMax,
    });
  }, speed);
};

/**
 * Updates the tamagotchi state locally and broadcasts it to other parts
 * of the application. Stores the updated state in local storage and sends
 * an event with new state.
 *
 * @returns {Object} The updated tamagotchi state.
 */
export const updateAndBroadcast = (newState) => {
  tamagotchiState = { ...tamagotchiState, ...newState };

  // Saves the current tamagotchi state at local data
  chrome.storage.local.set({ tamagotchiState });

  // Broadcasts the current tamagotchi state
  chrome.runtime.sendMessage({
    type: "STATE_UPDATED",
    payload: tamagotchiState,
  });

  return tamagotchiState;
};
