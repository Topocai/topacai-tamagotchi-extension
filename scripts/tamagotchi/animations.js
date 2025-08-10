const cat_idle = [
  ` /\\_/\\  \n( o.o ) \n > ^ < `,
  ` /\\_/\\  \n( o.O ) \n > ^ < `,
  ` /\\_/\\  \n( o.o ) \n > ^ < `,
];

const cat_happy = [
  ` /\\_/\\  \n( ^_^ ) \n > ^ < `,
  ` /\\_/\\  \n( ^o^ ) \n > ^ < `,
  ` /\\_/\\  \n( ^_~ ) \n > ^ < `,
];

const cat_sleeping = [
  ` /\\_/\\  \n( -.- ) z \n > ^ < `,
  ` /\\_/\\  \n( -.- ) Z \n > ^ < `,
  ` /\\_/\\  \n( -.- ) zz\n > ^ < `,
  ` /\\_/\\  \n( -.- ) zZ\n > ^ < `,
  ` /\\_/\\  \n( -.- ) zzz \n > ^ < `,
  ` /\\_/\\  \n( -.- ) zzZ \n > ^ < `,
];

const cat_unhappy = [
  ` /\\_/\\  \n( -_- ) \n > ^ < `,
  ` /\\_/\\  \n( >_< ) \n > ^ < `,
  ` /\\_/\\  \n( ಠ_ಠ ) \n > ^ < `,
];

const cat_action_eat = [
  ` /\\_/\\  \n( >w< ) 🍗\n > ^ < `,
  ` /\\_/\\  \n( >w< ) 🐟\n > ^ < `,
  ` /\\_/\\  \n( >w< ) 🥛\n > ^ < `,
];

const cat_action_pet = [
  ` /\\_/\\  \n( ^_^ ) 💕\n > ^ < `,
  ` /\\_/\\  \n( UwU ) ❤️\n > ^ < `,
  ` /\\_/\\  \n( ^w^ ) 💖\n > ^ < `,
];

const cat_content_gpt = [
  ` /\\_/\\  SYSTEM READY\n |°_°| > 🧠 INIT AI_CAT\n /___\\ `,
  ` /\\_/\\  ACCESS GRANTED\n |•_•| > 💾 DATA LOADED\n /___\\ `,
  ` /\\_/\\  WELCOME\n |^_^| > ☕ IDLE MODE\n /___\\ `,
];

export const animations_map = {
  idle: cat_idle,
  happy: cat_happy,
  sleeping: cat_sleeping,
  unhappy: cat_unhappy,
  eat: cat_action_eat,
  pet: cat_action_pet,
  gpt: cat_content_gpt,
};

export const states_map = {
  idle: cat_idle,
  happy: cat_happy,
  sleeping: cat_sleeping,
  unhappy: cat_unhappy,
};
