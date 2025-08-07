const hostname = window.location.hostname;

if (hostname.includes("chatgpt.com")) {
  CatActionReducer(null, GPTAction());
  ShowOnPage(action_speed * actions_map[action_current].length);
}
