import { MessageHandler } from "./tamagotchi/messageHandler.js";
import {
  setFrameInterval as FrameInterval,
  startGameLoop,
} from "./tamagotchi/gameLoop.js";
import {
  resetFrameInterval,
  loadData,
  setStats,
} from "./tamagotchi/stateManager.js";

//startGameLoop();

chrome.runtime.onStartup.addListener(loadData);
chrome.runtime.onInstalled.addListener(loadData);

chrome.commands.onCommand.addListener((command) => {
  if (command === "reset-stats") {
    setStats({ hungry: 100, happiness: 100, sleep: 100 });
  }
});

// manage all runtime events in extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type && message.payload)
    console.log(`event ${message.type} - ${JSON.stringify(message.payload)}`);

  const res = MessageHandler(message, sender);

  if (res) sendResponse(res);

  return true;
});

// Start the cat frame animation loop
FrameInterval(resetFrameInterval);
