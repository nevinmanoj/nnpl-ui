export const capsFirst = (string) => {
  if (!string) return ""; // Handle empty string
  return string.charAt(0).toUpperCase() + string.slice(1);
};
