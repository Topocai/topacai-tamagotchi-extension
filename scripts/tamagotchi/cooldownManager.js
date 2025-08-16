const createCooldownKey = (action) => `${action}_cooldown`;

/**
 * Creates a cooldown object with the given action and duration.
 *
 * @param {string} action - The action for which the cooldown is created.
 * @param {number} duration - The duration of the cooldown in minutes.
 * @return {Object} - The cooldown object with properties 'action', 'start',
 * and 'end', which is the end time of the cooldown in milliseconds.
 */
export const createCooldown = (action, duration) => {
  const start = Date.now();
  const end = new Date();

  end.setMinutes(end.getMinutes() + duration);

  return { action, start, end: end.valueOf() };
};

/**
 * Retrieves the cooldown object from local storage by the given key.
 *
 * @param {string} key - The key used to store the cooldown object in local
 * storage.
 * @return {Object} the cooldown object, or undefined if there doesn't exist
 */
export const getSavedCooldown = async (key) => {
  const cooldown = await chrome.storage.local.get(key);

  return cooldown;
};

/**
 * Checks if the cooldown for the given action has expired, and if not,
 * recovers it. If it has expired, creates a new alarm to fire the cooldown
 *
 * @param {string} action - The action for which the cooldown is checked.
 */
export const checkAndRecoverCooldown = async (action) => {
  const cooldown = await getSavedCooldown(createCooldownKey(action));

  if (!cooldown) return;

  const key = createCooldownKey(action);
  const instantDispatch = !isOnCooldown(cooldown);

  chrome.alarms.get(key, (alarm) => {
    if (alarm) {
      chrome.alarms.clear(key);
    }

    if (instantDispatch) {
      chrome.alarms.create(key, {
        when: Date.now(),
      });
      return;
    }

    chrome.alarms.create(key, {
      when: cooldown.end,
    });
  });
};

/**
 * Sets a cooldown for the given action. If the cooldown already exists, it
 * is cleared and reset.
 *
 * @param {Object} cooldown - The cooldown object with properties 'action'
 * and 'end', which is the end time of the cooldown in milliseconds.
 */
export const setCooldown = (cooldown) => {
  const { action, end } = cooldown;

  if (Date.now() > end) return;

  saveCooldown(cooldown);

  const cooldownKey = createCooldownKey(action);

  chrome.alarms.get(cooldownKey, (alarm) => {
    if (!alarm) {
      console.log("creating cooldown");
      chrome.alarms.create(cooldownKey, {
        when: end,
      });
    } else {
      console.log("cooldown exists, resseting");
      chrome.alarms.clear(cooldownKey);
      chrome.alarms.create(cooldownKey, {
        when: end,
      });
    }
  });
};

/**
 * Saves the given cooldown object in local storage. If the cooldown's end time
 * has passed, the cooldown is not saved.
 *
 * @param {Object} cooldown - The cooldown object with properties 'action'
 * and 'end', which is the end time of the cooldown in milliseconds.
 */
export const saveCooldown = (cooldown) => {
  const { action, end } = cooldown;
  if (Date.now() > end) return;

  chrome.storage.local.set({ [createCooldownKey(action)]: cooldown });
};

export const getCooldownRemaining = (cooldown) => {
  const { end } = cooldown;

  return end - Date.now();
};

export const isOnCooldown = (cooldown) => {
  const { end } = cooldown;

  return Date.now() < end;
};
