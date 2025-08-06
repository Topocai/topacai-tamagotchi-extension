const hostname = window.location.hostname;

if (hostname.includes("chatgpt.com")) {
  CatActionReducer(null, GPTAction(1200));
  ShowOnPage(action_speed * actions_map[action_current].length);
}
