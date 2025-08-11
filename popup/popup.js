const display_cat_element = document.getElementById("cat-popup");

function getFrame(callback) {
  chrome.runtime.sendMessage({ ...ActionDefinitions.GET_FRAME }, (response) => {
    callback(response);
  });
}

function updateCatElement() {
  if (display_cat_element) {
    getFrame((frame) => {
      display_cat_element.textContent = frame;
    });
  }
}

updateCatElement();

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

const hungry_display = document.getElementById("hungry-stat");
const happiness_display = document.getElementById("happiness-stat");
const sleep_display = document.getElementById("sleep-stat");

chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== ActionDefinitions.UPDATE.type) return;

  chrome.runtime.sendMessage({ ...ActionDefinitions.GET_STATS }, (stats) => {
    console.log(`Stats: ${JSON.stringify(stats)}`);

    hungry_display.textContent = `Hungry: [${"=".repeat(
      stats.hungry / 16
    )}${"-".repeat(16 - stats.hungry / 16)}] ${Math.floor(stats.hungry)}%`;

    happiness_display.textContent = `Happiness: [${"=".repeat(
      stats.happiness / 16
    )}${"-".repeat(16 - stats.happiness / 16)}] ${Math.floor(
      stats.happiness
    )}%`;

    sleep_display.textContent = `Sleep: [${"=".repeat(
      stats.sleep / 16
    )}${"-".repeat(16 - stats.sleep / 16)}] ${Math.floor(stats.sleep)}%`;
  });

  updateCatElement();
});
