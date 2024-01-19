/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatTimeHoursMinutesSeconds = (ms: number) => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  const formattedTime = [];

  if (hours > 0) {
    formattedTime.push(`${hours} h`);
  }

  if (minutes > 0) {
    formattedTime.push(`${minutes} min`);
  }

  if (seconds > 0) {
    formattedTime.push(`${seconds} sec`);
  }

  return formattedTime.join(" ");
};
