const display_cat_element = document.getElementById("cat-popup");

display_cat_element.textContent = display_cat;

document.getElementById("changeState").addEventListener("click", function () {
  NextState();
});

document.getElementById("actionPet").addEventListener("click", function () {
  CatActionReducer(null, PetAction());
});

document.addEventListener("frameUpdate", () => {
  if (display_cat_element) display_cat_element.textContent = display_cat;
});
