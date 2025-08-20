export const PetAction = (speed = 2) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "pet",
    speed,
  },
});

export const EatAction = (speed = 2) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "eat",
    speed,
  },
});

export const GPTAction = (speed = 0.8) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "gpt",
    speed,
  },
});

export const ActionDefinitions = {
  PERFORM_ACTION: {
    type: "PERFORM_ACTION",
    payloads: {
      pet: PetAction().payload,
      eat: EatAction().payload,
      gpt: GPTAction().payload,
    },
  },
  SET_STATE: { type: "SET_STATE" },
  SWITCH_SLEEP: { type: "SWITCH_SLEEP" },
  GET_FRAME: { type: "GET_FRAME" },
  GET_STATE: { type: "GET_STATE" },
  NEXT_STATE: { type: "NEXT_STATE" },
  NEW_FRAME: { type: "NEW_FRAME" },
  STATE_UPDATE: { type: "STATE_UPDATED" },
  STATS_UPDATE: { type: "STATS_UPDATED" },
  TICK: { type: "TICK" },
  GET_STATS: { type: "GET_STATS" },
};

export const AlarmDefinitions = {
  TICK: { name: "TICK", storage: "gameLoopKey" },
};
