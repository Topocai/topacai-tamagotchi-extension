import { performAction, setState, getCurrentFrame } from "./core.js";

import { tamagotchiState } from "./stateManager.js";

export const MessageHandler = (args, sender) => {
  switch (args.type) {
    case "PERFORM_ACTION":
      return performAction(args.payload.action, args.payload.speed || 750);
    case "SET_STATE":
      return setState(args.payload.state, args.payload.speed || 1000);
    case "GET_FRAME":
      return getCurrentFrame();
    case "GET_STATE":
      return tamagotchiState;
    default:
      return tamagotchiState;
  }
};

export const PetAction = (speed = 500) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "pet",
    speed,
  },
});

export const EatAction = (speed = 500) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "eat",
    speed,
  },
});

export const GPTAction = (speed = 500) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "gpt",
    speed,
  },
});
