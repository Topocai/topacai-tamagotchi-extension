document.getElementById("changeState").addEventListener("click", function () {
  NextState();
});

document.getElementById("actionPet").addEventListener("click", function () {
  CatActionReducer(null, PetAction());
});

setInterval(() => {
  let cat_pre = document.getElementById("cat-popup");
  if (cat_pre) cat_pre.textContent = display_cat;
}, 50);
