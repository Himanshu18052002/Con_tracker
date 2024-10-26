export const normalDateStrings = (date) => {
  const dateObject = new Date(date);
  const formattedTime = dateObject.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
};
