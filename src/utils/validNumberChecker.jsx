export const isValidNumber = (value) => {
  // return /^\d+$/.test(value); only for number
  return /^\d+(\.\d+)?$/.test(value); //for number and decimal
};
