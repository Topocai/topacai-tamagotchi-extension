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

chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== ActionDefinitions.UPDATE.type) return;

  updateCatElement();
});
