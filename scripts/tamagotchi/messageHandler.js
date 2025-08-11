import { performAction, setState, getCurrentFrame, NextState } from "./core.js";

import { tamagotchiState, getStats } from "./stateManager.js";

import { ActionDefinitions } from "./definitions.js";

/**
 * Handles incoming messages from the browser.
 *
 * @param {object} message - An object with a type and payload, where type can be found on the `ActionDefinitions` object
 * @param {object} sender - The sender of the message, which is currently unused.
 *
 * @returns {object|string} - The response to the message, or the current
 *   tamagotchiState if the type was not recognized.
 */
export const MessageHandler = (message, sender) => {
  switch (message.type) {
    case ActionDefinitions.PERFORM_ACTION.type:
      return performAction(
        message.payload.action,
        message.payload.speed || 750
      );
    case ActionDefinitions.SET_STATE.type:
      return setState(message.payload.state, message.payload.speed || 1000);
    case ActionDefinitions.GET_FRAME.type:
      return getCurrentFrame();
    case ActionDefinitions.GET_STATE.type:
      return tamagotchiState;
    case ActionDefinitions.NEXT_STATE.type:
      return NextState();
    case ActionDefinitions.GET_STATS.type:
      return getStats();
    default:
      return tamagotchiState;
  }
};
