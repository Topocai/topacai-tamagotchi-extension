/**
 * Create a bar display using used-free values
 *
 * @param {number} used - The amount of the bar that will be fill.
 * @param {number} free - The amount of the bar that will be empty.
 * @return {string} The bar string.
 */
const CreateBar = (used, free) => {
  const full = "▰";
  const empty = "▱";
  const total = used + free;
  used = Math.round((used / total) * 10);
  free = Math.round((free / total) * 10);

  return full.repeat(used) + empty.repeat(free);
};
