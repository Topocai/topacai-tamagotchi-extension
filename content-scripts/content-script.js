const hostname = window.location.hostname;

// Listen to messages from the background script to show the cat on page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SHOW_CAT") {
    ShowOnPage(message.duration || 5000);
  }
});

if (hostname.includes("chatgpt.com")) {
  chrome.runtime.sendMessage(GPTAction());
  ShowOnPage(7000);
}

const cookiePanelPossibleElements = document.querySelectorAll(
  '[class*="cookie"], [id*="cookie"]'
);

if (cookiePanelPossibleElements.length > 0) {
  chrome.runtime.sendMessage(CookiesAction());
  ShowOnPage(7000);
}
