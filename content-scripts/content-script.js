const hostname = window.location.hostname;

if (hostname.includes("chatgpt.com")) {
  chrome.runtime.sendMessage(GPTAction());
  ShowOnPage(7000);
}
