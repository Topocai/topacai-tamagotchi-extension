let FrameInterval = null;

/**
 * Creates an interval that updates the cat animation in a specific speed
 * and reset previous interval if it exists
 *
 * @param {function} callback - The function to be called on each interval, make sure to pass `resetFrameInterval` from stateManager
 * @param {number} [speed=1000] - The speed at which the animation should be updated
 */
export const setFrameInterval = (callback, speed = 1000) => {
  if (FrameInterval) clearInterval(FrameInterval);
  FrameInterval = setInterval(callback, speed);
};

export const startGameLoop = async () => {
  chrome.alarms.get("gameLoop", (alarm) => {
    if (!alarm) {
      chrome.alarms.create("gameLoop", {
        periodInMinutes: 1 / 60, // 1 per second, is the minimum recommended
      });
    }
  });
};
