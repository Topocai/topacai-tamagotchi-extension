import { setFrameInterval as FrameInterval } from "./frameManager.js";

export let tamagotchiState = {
  state: "idle",
  action: null,

  frame: 0,
  frameMax: 3,
};

export const resetFrameInterval = (speed = 1000) => {
  FrameInterval(() => {
    tamagotchiState.frame =
      (tamagotchiState.frame + 1) % tamagotchiState.frameMax;
    updateAndBroadcast({});
  }, speed);
};

export const updateAndBroadcast = () => {
  tamagotchiState = { ...tamagotchiState };

  // Guardar en almacenamiento persistente
  chrome.storage.local.set({ tamagotchiState });

  // Notificar a todos los contextos abiertos
  chrome.runtime.sendMessage({
    type: "STATE_UPDATED",
    payload: tamagotchiState,
  });

  return tamagotchiState;
};
