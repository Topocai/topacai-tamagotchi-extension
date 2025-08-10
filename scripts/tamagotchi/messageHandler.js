import { performAction, setState, getCurrentFrame } from "./core.js";

import { tamagotchiState } from "./stateManager.js";

/**
 * Handles incoming messages from the browser.
 *
 * @param {object} args - An object with a type and payload, where type is one of
 *   "PERFORM_ACTION", "SET_STATE", "GET_FRAME", or "GET_STATE".
 * @param {object} sender - The sender of the message, which is currently unused.
 *
 * @returns {object|string} - The response to the message, or the current
 *   tamagotchiState if the type was not recognized.
 */
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
