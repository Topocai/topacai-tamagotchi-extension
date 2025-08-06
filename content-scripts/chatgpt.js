alert(
  "No andes utilizando a gpt como tu psicologo Angie, te lo advierto\nFirma: ~Flor"
);

CatActionReducer(null, GPTAction(750));

function iniciarSaludo() {
  ShowOnPage(action_speed * actions_map[action_current].length);
}

iniciarSaludo();
