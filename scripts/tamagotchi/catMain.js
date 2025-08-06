const states_map = {
  idle: cat_idle,
  happy: cat_happy,
  sleeping: cat_sleeping,
  unhappy: cat_unhappy,
};

const FrameUpdateEvent = new CustomEvent("frameUpdate");

let state_current = "idle";
let state_interval;
let state_frame = 0;

let display_cat = "";

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
  display_cat = animation_set[frame];
  document.dispatchEvent(FrameUpdateEvent);
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

function ShowOnPage(duration = 5000) {
  const pre = document.createElement("pre");
  pre.style.background = "black";
  pre.style.color = "white";
  pre.style.position = "fixed";
  pre.style.bottom = "10px";
  pre.style.right = "10px";
  pre.style.zIndex = "9999";
  pre.style.border = "1px solid #ccc";
  pre.style.padding = "25px";
  pre.style.margin = "10px";
  pre.style.fontFamily = "JetBrains Mono, monospace";
  pre.style.fontSize = "16px";
  pre.style.whiteSpace = "pre";

  pre.style.display = "flex";
  pre.style.flexDirection = "column";
  pre.style.alignItems = "center";

  pre.textContent = display_cat;
  document.body.appendChild(pre);

  const listener = () => {
    pre.textContent = display_cat;
  };

  document.addEventListener("frameUpdate", listener);

  setTimeout(() => {
    document.removeEventListener("frameUpdate", listener);
    pre.remove();
  }, duration);
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

StartCatStateHandler();
