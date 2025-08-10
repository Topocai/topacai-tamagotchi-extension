const display_cat_element = document.getElementById("cat-popup");

document.getElementById("changeState").addEventListener("click", function () {
  /*const newState = NextState();

  chrome.runtime.sendMessage({
    type: "SET_STATE",
    payload: { state: newState },
  });*/
});

document.getElementById("actionPet").addEventListener("click", function () {
  //CatActionReducer(null, PetAction());
});
/*
document.addEventListener("frameUpdate", () => {
  if (display_cat_element) display_cat_element.textContent = display_cat;
});*/

chrome.runtime.onMessage.addListener((message) => {
  chrome.runtime.sendMessage({ type: "GET_FRAME" }, (response) => {
    console.log(response);
    if (display_cat_element) display_cat_element.textContent = response;
  });
});
