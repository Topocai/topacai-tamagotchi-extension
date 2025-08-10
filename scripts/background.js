import { MessageHandler } from "./tamagotchi/messageHandler.js";
import { setFrameInterval as FrameInterval } from "./tamagotchi/frameManager.js";
import { resetFrameInterval } from "./tamagotchi/stateManager.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const res = MessageHandler(message, sender);

  if (res) sendResponse(res);

  return true;
});

FrameInterval(resetFrameInterval);
