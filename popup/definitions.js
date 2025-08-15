const PetAction = (speed = 2) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "pet",
    speed,
  },
});

const EatAction = (speed = 2) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "eat",
    speed,
  },
});

const GPTAction = (speed = 2) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "gpt",
    speed,
  },
});

const ActionDefinitions = {
  PERFORM_ACTION: {
    type: "PERFORM_ACTION",
    payloads: {
      pet: PetAction().payload,
      eat: EatAction().payload,
      gpt: GPTAction().payload,
    },
  },
  SET_STATE: { type: "SET_STATE" },
  GET_FRAME: { type: "GET_FRAME" },
  GET_STATE: { type: "GET_STATE" },
  NEXT_STATE: { type: "NEXT_STATE" },
  UPDATE: { type: "STATE_UPDATED" },
  TICK: { type: "TICK" },
  GET_STATS: { type: "GET_STATS" },
};
