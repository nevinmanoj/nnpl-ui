export const structValidator = (obj, properties) => {
  if (obj == null) {
    return false;
  }
  for (let prop of properties) {
    if (obj[prop] === null || obj[prop] === undefined || obj[prop] === "") {
      return false;
    }
  }
  return true;
};
