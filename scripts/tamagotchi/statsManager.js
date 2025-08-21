// Universal and current tamagotchi stats
// Here all persistent data will be stored
export let tamagotchiStats = {
  hungry: 0,
  happiness: 0,
  sleep: 0,
};

// losts 100 points of hungry in 20 minutes, recovers 33 points for each eat interaction, with 2.5 minutes cooldown
// losts 100 points of happiness in 60 minutes, recovers 18 points for each pet interaction, with 1.5 minutes cooldown
// losts 100 points of sleep in 180 minutes, recovers 100 points in 60 minutes if it is sleeping

export const STAT_LOW_NOTIFICATION = {
  hungry: 55,
  happiness: 60,
  sleep: 20,
};

export const STAT_CRITICAL_VALUE = {
  hungry: 33,
  happiness: 40,
  sleep: 10,
};

export const HUNGRY_LOST_PER_SECOND = 100 / (60 * 1); // 1 minute for debug
export const HAPPINESS_LOST_PER_SECOND = 100 / (60 * 1);
export const SLEEP_LOST_PER_SECOND = 100 / (60 * 1);

export const SLEEP_RECOVER_PER_SECOND = 100 / (60 * 1);

export const loadData = () => {
  chrome.storage.local.get(["tamagotchiStats"], (data) => {
    updateAndBroadcast({ ...(data.tamagotchiStats || tamagotchiStats) });
  });
};

export const getStats = () => tamagotchiStats;

export const setStats = (stats) => {
  const newStats = Object.keys(tamagotchiStats).reduce((acc, key) => {
    acc[key] = stats[key] || tamagotchiStats[key];
    return acc;
  }, {});

  updateAndBroadcast(newStats);
};

export const addStats = (stats) => {
  const newStats = Object.keys(tamagotchiStats).reduce((acc, key) => {
    acc[key] = tamagotchiStats[key] + (stats[key] || 0);
    return acc;
  }, {});

  updateAndBroadcast(newStats);
};

/**
 * Updates the tamagotchi stats locally and broadcasts it to other parts
 * of the application. Stores the updated state in local storage and sends
 * an event with new stats.
 *
 * @returns {Object} The updated tamagotchi stats.
 */
export const updateAndBroadcast = (newData) => {
  Object.keys(newData).forEach((key) => {
    if (newData[key] < 0) newData[key] = 0;
    if (newData[key] > 100) newData[key] = 100;
  });

  tamagotchiStats = { ...tamagotchiStats, ...newData };

  // Saves the current tamagotchi state at local data
  chrome.storage.local.set({ tamagotchiStats });

  // Broadcasts the current tamagotchi state
  chrome.runtime.sendMessage({
    type: "STATS_UPDATED",
    payload: tamagotchiStats,
  });

  return tamagotchiStats;
};
