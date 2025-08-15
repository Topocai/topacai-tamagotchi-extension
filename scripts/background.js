import { MessageHandler } from "./tamagotchi/messageHandler.js";
import { startGameLoop } from "./tamagotchi/gameLoop.js";
import {
  loadData as loadStateData,
  resetFrameLoop,
} from "./tamagotchi/stateManager.js";

import {
  loadData as loadStatsData,
  setStats,
} from "./tamagotchi/statsManager.js";

const loadData = () => {
  loadStateData();
  loadStatsData();
};

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
});

startGameLoop();

resetFrameLoop();
