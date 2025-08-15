import { startFrameLoop } from "./gameLoop.js";
// Universal and current tamagotchi state
// Here all persistent data will be stored
export let tamagotchiState = {
  state: "idle",
  action: null,

  frame: 0,
  frameMax: 3,
};

export const loadData = () => {
  chrome.storage.local.get(["tamagotchiState"], (data) => {
    updateAndBroadcast({ ...(data.tamagotchiState || tamagotchiState) });
  });
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
