import { MessageHandler } from "./tamagotchi/messageHandler.js";
import { startGameLoop } from "./tamagotchi/gameLoop.js";
import {
  loadData as loadStateData,
  resetFrameLoop,
} from "./tamagotchi/stateManager.js";

import {
  loadData as loadStatsData,
  setStats,
  tamagotchiStats,
} from "./tamagotchi/statsManager.js";

import {
  createCooldown,
  setCooldown,
  checkAndRecoverCooldown,
} from "./tamagotchi/cooldownManager.js";

const loadData = () => {
  loadStateData();
  loadStatsData();
};

chrome.runtime.onStartup.addListener(loadData);
chrome.runtime.onInstalled.addListener(loadData);

checkAndRecoverCooldown("eat");

chrome.commands.onCommand.addListener((command) => {
  if (command === "reset-stats") {
    const newStats = {};
    Object.keys(tamagotchiStats).forEach((key) => {
      newStats[key] = 100;
    });
    setStats(newStats);
  }

  if (command === "debug-command") {
    const cooldownTest = createCooldown("eat", 1);

    setCooldown(cooldownTest);
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "gameLoop") return;
  const nameSplited = alarm.name.split("_");

  if (nameSplited[nameSplited.length - 1] !== "cooldown") return;

  console.log("Cooldown fired");

  chrome.storage.local.remove(alarm.name);
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
