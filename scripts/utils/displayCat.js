// NON MODULE SCRIPT!

/**
 * Gets the current frame from runtime
 * And calls the passed function argument with the frame value as argument
 * @param {function} callback Callback function that receive the current frame as unique argument
 */
function GetFrame(callback = () => {}) {
  chrome.runtime.sendMessage({ type: "GET_FRAME" }, (response) => {
    callback(response);
  });
}

function GetState(callback = () => {}) {
  chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
    callback(response);
  });
}

const ShowOnPage = (duration = 5000) => {
  const style = document.createElement("style");
  style.textContent = `
:root {
  --color-main: #e5a0f1;
  --color-secondary: #b57bc0;
}

#catContainer {
  border: 1px inset var(--color-main);
  min-width: 250px;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100px;
}

#cat-popup {
  font-family: "Fira Code", "Consolas", monospace;
  font-size: 16px;
}
`;
  document.head.appendChild(style);

  const catContainer = document.createElement("div", { id: "catContainer" });
  const catDisplay = document.createElement("pre", { id: "cat-popup" });

  catContainer.style.background = "black";
  catContainer.style.color = "white";
  catContainer.style.position = "fixed";
  catContainer.style.bottom = "10px";
  catContainer.style.right = "10px";
  catContainer.style.zIndex = "9999";

  catContainer.style.padding = "25px";
  catContainer.style.margin = "10px";

  catContainer.style.display = "flex";
  catContainer.style.flexDirection = "column";
  catContainer.style.alignItems = "center";

  catDisplay.textContent = "";
  GetFrame((frame) => (catDisplay.textContent = frame));
  document.body.appendChild(catContainer);
  catContainer.appendChild(catDisplay);

  setInterval(() => {
    GetFrame((frame) => (catDisplay.textContent = frame));
  }, 200);

  setTimeout(() => {
    catContainer.remove();
  }, duration);
};
