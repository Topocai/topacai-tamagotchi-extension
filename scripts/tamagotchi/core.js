import { animations_map as animations } from "./animations.js";
import {
  tamagotchiState,
  updateAndBroadcast,
  resetFrameInterval,
} from "./stateManager.js";

export const getCurrentFrame = () => {
  return animations[
    tamagotchiState.action ? tamagotchiState.action : tamagotchiState.state
  ][tamagotchiState.frame];
};

export const performAction = (action, speed = 1000) => {
  resetFrameInterval(speed);

  return updateAndBroadcast({
    action,
    frame: 0,
    frameMax: animations[action].length,
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
