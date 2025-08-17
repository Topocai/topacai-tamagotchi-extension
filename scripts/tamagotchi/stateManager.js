import { startFrameLoop } from "./gameLoop.js";
import { animations_map } from "./animations.js";
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

  // Frame loop make sure to always update the animation to an apropiate frame value
  // also removes the action animation when it finishes, by this, if the action was saved on storage
  // and recovered it also ends
  startFrameLoop(() => {
    const nextFrame = tamagotchiState.frame + 1;
    // Check if is needed to remove the current action
    const removeAction =
      tamagotchiState.action && nextFrame >= tamagotchiState.frameMax;
    // If the current action is removed, updates the frame max with the current state animation length
    const frameMax = removeAction
      ? animations_map[tamagotchiState.state].length
      : tamagotchiState.frameMax;

    updateAndBroadcast({
      action: removeAction ? null : tamagotchiState.action,
      frame: nextFrame % tamagotchiState.frameMax,
      frameMax,
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
