export const ddmmmyyyy = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
export const ddmmyyyy = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so +1) and pad with leading zero
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`;
};

export const getObjddmmyyyy = (dateString) => {
  const [day, month, year] = dateString.split("/");

  return new Date(year, month - 1, day);
};
