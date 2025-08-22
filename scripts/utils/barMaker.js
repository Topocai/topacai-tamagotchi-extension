// NON MODULE SCRIPT!

/**
 * Create a bar display using used-free values
 *
 * @param {number} used - The amount of the bar that will be fill.
 * @param {number} free - The amount of the bar that will be empty.
 * @return {string} The bar string.
 */

const bar_usedChar = "▰";
const bar_freeChar = "▱";

const CreateBar = (used, free) => {
  const total = used + free;
  used = Math.round((used / total) * 10);
  free = Math.round((free / total) * 10);

  return bar_usedChar.repeat(used) + bar_freeChar.repeat(free);
};
