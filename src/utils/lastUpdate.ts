export function getLastUpdateTime(lastUpdate: string) {
  if (lastUpdate === 'just now' || lastUpdate === 'No updated time found') return lastUpdate;
  if (!lastUpdate) {
    return "No updated time found";
  }

  let lastUpdateTime;
  try {
    lastUpdateTime = new Date(JSON.parse(lastUpdate));
  } catch (error) {
    console.error("Error parsing lastUpdate:", error);
    return "Invalid date format";
  }

  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - lastUpdateTime.getTime();

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let humanReadable = "";
  if (days > 0) {
    humanReadable += `${days} day${days > 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    humanReadable += `${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    humanReadable += `${minutes} minute${minutes > 1 ? "s" : ""} `;
  }
  if (seconds > 0) {
    humanReadable += `${seconds} second${seconds > 1 ? "s" : ""} `;
  }

  return humanReadable.trim() || "just now";
}
