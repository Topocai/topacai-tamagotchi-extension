const hostname = window.location.hostname;

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
