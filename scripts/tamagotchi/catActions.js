const actions_map = {
  pet: cat_action_pet,
  eat: cat_action_eat,
  gpt: cat_content_gpt,
};

let action_current = "pet";
let action_interval;
let action_stop_interval;
let action_frame = 0;
let action_performing = false;
let action_speed = 500;

const CatActionReducer = (state, action) => {
  switch (action.type) {
    case "PERFORM_ACTION":
      PerformCatAction(action.payload.action, action.payload.speed);
      return state;
    default:
      return state;
  }
};

const PetAction = (speed = 500) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "pet",
    speed,
  },
});

const EatAction = (speed = 500) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "eat",
    speed,
  },
});

const GPTAction = (speed = 500) => ({
  type: "PERFORM_ACTION",
  payload: {
    action: "gpt",
    speed,
  },
});

/**
 * Performs a given cat action, stopping any current state animation and
 * waiting for the action animation to finish before resuming the state
 * animation.
 *
 * @param {string} action - The action to perform
 * @param {number} speed - The speed at which to perform the action
 */
function PerformCatAction(action, speed = 500) {
  if (action_performing) return;

  action_speed = speed;

  action_performing = true;
  // Stop state animator
  StopCatStateHandler();

  // Display action animation
  action_frame = 0;
  action_current = action;

  action_interval = setInterval(() => {
    UpdateCat(
      action_current,
      (action_frame = (action_frame + 1) % actions_map[action].length)
    );
  }, speed);

  UpdateCat(action_current, 0);

  // Waits for action animation to finish and start state animation
  action_stop_interval = setInterval(() => {
    action_performing = false;

    clearInterval(action_interval);
    clearInterval(action_stop_interval);

    StartCatStateHandler();
  }, speed * actions_map[action].length + 1);
}
