const states_map = {
  idle: cat_idle,
  happy: cat_happy,
  sleeping: cat_sleeping,
  unhappy: cat_unhappy,
};

let state_current = "idle";
let state_interval;
let state_frame = 0;

/**
 * Updates the displayed cat animation based on the given state and frame.
 *
 * @param {string} state - The current state of the cat, based on states map
 * @param {number} frame - Specific frame index to display
 */
function UpdateCat(state, frame) {
  let animation_set = states_map[state];

  if (!animation_set) {
    animation_set = actions_map[action_current];
  }

  if (!animation_set) {
    return console.error("No animation set found");
  }

  document.getElementById("cat").textContent = animation_set[frame];
}

/**
 * Starts the interval that updates the cat animation based on the current state.
 *
 * Will update the cat animation every 750ms, and will loop through the animation
 * frames provided in the states map.
 */
function StartCatStateHandler() {
  state_frame = 0;
  state_interval = setInterval(() => {
    UpdateCat(
      state_current,
      (state_frame = (state_frame + 1) % states_map[state_current].length)
    );
  }, 750);
  UpdateCat(state_current, 0);
}

function StopCatStateHandler() {
  clearInterval(state_interval);
}

/**
 * Switches to the next state in the states map, and updates the displayed cat.
 *
 * @function
 */
const NextState = () => {
  state_current =
    Object.keys(states_map)[
      (Object.keys(states_map).indexOf(state_current) + 1) %
        Object.keys(states_map).length
    ];
  UpdateCat(state_current, 0);
};

const SetState = (newState) => {
  state_current = newState;
  UpdateCat(state_current, 0);
};

document.getElementById("changeState").addEventListener("click", function () {
  NextState();
});

document.getElementById("actionPet").addEventListener("click", function () {
  CatActionReducer(null, PetAction());
});

StartCatStateHandler();
