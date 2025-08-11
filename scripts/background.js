import { MessageHandler } from "./tamagotchi/messageHandler.js";
import {
  setFrameInterval as FrameInterval,
  startGameLoop,
} from "./tamagotchi/gameLoop.js";
import { resetFrameInterval } from "./tamagotchi/stateManager.js";

// manage all runtime events in extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type && message.payload)
    console.log(`event ${message.type} - ${JSON.stringify(message.payload)}`);

  const res = MessageHandler(message, sender);

  if (res) sendResponse(res);

  return true;
});

startGameLoop();

// Start the cat frame animation loop
FrameInterval(resetFrameInterval);
