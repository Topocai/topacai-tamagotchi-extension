let FrameInterval = null;

export const setFrameInterval = (callback, speed = 1000) => {
  if (FrameInterval) clearInterval(FrameInterval);
  FrameInterval = setInterval(callback, speed);
};
