const CAT_FRAME_DISPLAY = document.getElementById("cat-popup");

const STAT_DISPLAYS = {
  hungry: document.getElementById("hungry-stat"),
  happiness: document.getElementById("happiness-stat"),
  sleep: document.getElementById("sleep-stat"),
};

/**
 * Gets the current frame from runtime
 * And calls the passed function argument with the frame value as argument
 * @param {function} callback Callback function that receive the current frame as unique argument
 */
function GetFrame(callback = () => {}) {
  chrome.runtime.sendMessage({ ...ActionDefinitions.GET_FRAME }, (response) => {
    callback(response);
  });
}

/*
 * Updates the cat visual element in page by getting the current frame in runtime application
 */
function UpdateCatElement() {
  if (CAT_FRAME_DISPLAY) {
    GetFrame((frame) => {
      CAT_FRAME_DISPLAY.textContent = frame;
    });
  }
}

/**
 * Updates the stat visual element in page by passing stat name and value
 * @param {o} stat the stat to update
 * @param {number} value the value of the stat
 */
function UpdateStatDisplay(stat, value) {
  const displayer = STAT_DISPLAYS[stat];
  if (!displayer) {
    console.warn(`No stat display found for ${stat}`);
    return;
  }
  STAT_DISPLAYS[stat].innerHTML = `${stat}: [${CreateBarWithStat(
    value
  )}] ${Math.floor(value)}%`;
}

/*
 * Updates all visual stats elements in page by getting the current stats in runtime application
 */
function InitStatDisplayers() {
  for (const stat in STAT_DISPLAYS) {
    chrome.runtime.sendMessage({ ...ActionDefinitions.GET_STATS }, (stats) => {
      UpdateStatDisplay(stat, stats[stat]);
    });
  }
}

const CreateBarWithStat = (stat) => {
  const bar = `${CreateBar(stat / 16, (100 - stat) / 16)}`;

  // Highligh "free" characteres with a specified color using <span> element
  const free_first = bar.indexOf(bar_freeChar);
  const free_last = bar.lastIndexOf(bar_freeChar);

  const noFree = free_first === -1 || free_last === -1;

  const freeHighlighted = noFree
    ? bar
    : bar.slice(0, free_first) + //Slice from start to the first character, and add the span element
      `<span style="color: var(--color-main);">${bar_freeChar}` +
      bar.slice(free_first + 1, free_last) +
      `${bar_freeChar}</span>`; // close the span element on last element

  // Highligh "used" characteres with a specified color using <span> element
  const used_first = bar.indexOf(bar_usedChar);
  const used_last = bar.lastIndexOf(bar_usedChar);

  const noUsed = used_first === -1 || used_last === -1;

  const usedHighlighted = noUsed
    ? freeHighlighted
    : bar.slice(0, used_first) + // Slice from start to the first character, and add the span element
      `<span style="color: var(--color-secondary);">${bar_usedChar}` +
      bar.slice(used_first + 1, used_last) +
      `${bar_usedChar}</span>` + // close the span element
      freeHighlighted.slice(used_last + 1); // add all the "free" characters already highlighted at the end of the string withouth including "used" characters

  return usedHighlighted;
};

// Init visuals
UpdateCatElement();
InitStatDisplayers();

//============================================= [ BUTTON LISTENERS ] =============================================
document.getElementById("changeState").addEventListener("click", function () {
  chrome.runtime.sendMessage({
    type: ActionDefinitions.NEXT_STATE.type,
  });
});

document.getElementById("actionPet").addEventListener("click", function () {
  chrome.runtime.sendMessage({
    type: ActionDefinitions.PERFORM_ACTION.type,
    payload: ActionDefinitions.PERFORM_ACTION.payloads.pet,
  });
});

document.getElementById("actionEat").addEventListener("click", function () {
  chrome.runtime.sendMessage({
    type: ActionDefinitions.PERFORM_ACTION.type,
    payload: ActionDefinitions.PERFORM_ACTION.payloads.eat,
  });
});

document.getElementById("actionSleep").addEventListener("click", function () {
  chrome.runtime.sendMessage(ActionDefinitions.SWITCH_SLEEP);
});

//============================================= [ BUTTON LISTENERS ] =============================================

// Frame Update
chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== ActionDefinitions.STATE_UPDATE.type) return;

  UpdateCatElement();
});

// Stats Update
chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== ActionDefinitions.STATS_UPDATE.type) return;

  chrome.runtime.sendMessage({ ...ActionDefinitions.GET_STATS }, (stats) => {
    // Iterate through all stats, find the display for it,
    // and updates visual using bar creation function by using `UpdateStatDisplay` function
    Object.keys(STAT_DISPLAYS).forEach((stat) => {
      UpdateStatDisplay(stat, stats[stat]);
    });
  });
});
