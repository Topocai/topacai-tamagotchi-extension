import { animations_map as animations } from "./animations.js";
import {
  tamagotchiState,
  updateAndBroadcast,
  resetFrameInterval,
} from "./stateManager.js";

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
 * @param {number} [speed=1000] - The speed at which to perform the action
 *
 * @returns {Object} The updated tamagotchi state
 */
export const performAction = (action, speed = 1000) => {
  resetFrameInterval(speed);

  const frameCount = animations[action].length;

  setTimeout(
    () => updateAndBroadcast({ action: null, frame: 0 }),
    speed * frameCount
  );

  return updateAndBroadcast({
    action,
    frame: 0,
    frameMax: frameCount,
  });
};

export const setState = (state, speed = 1000) => {
  resetFrameInterval(speed);

  return updateAndBroadcast({
    state,
    frameMax: animations[state].length,
    frame: 0,
  });
};
