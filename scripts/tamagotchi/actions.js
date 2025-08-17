export const Pet = () => ({
  type: "pet",
  cooldown: 1,
  recover: {
    hapinness: 18,
  },
});

export const Eat = () => ({
  type: "eat",
  cooldown: 2.5,
  recover: {
    hungry: 33,
  },
});

export const Actions = {
  pet: Pet(),
  eat: Eat(),
};
