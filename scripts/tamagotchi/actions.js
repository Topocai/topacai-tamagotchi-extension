export const Pet = () => ({
  type: "pet",
  cooldown: 1,
  recover: {
    happiness: 18,
  },
});

export const Eat = () => ({
  type: "eat",
  cooldown: 2.5,
  recover: {
    hungry: 33,
  },
});

export const Cookies = () => ({
  type: "cookies",
  recover: {
    happiness: 10,
    hungry: 10,
  },
});

export const Actions = {
  pet: Pet(),
  eat: Eat(),
  cookies: Cookies(),
};
