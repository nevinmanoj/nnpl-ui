import { isValidNumber } from "./validNumberChecker";

export const itemsValidator = (products, discount, roundOff) => {
  const errorMsg = {
    value: true,
    msg: "Select valid values for required fields",
  };

  if (discount === "" || discount === null || !isValidNumber(discount)) {
    return errorMsg;
  }
  if (roundOff === "" || roundOff == null || !isValidNumber(roundOff)) {
    return errorMsg;
  }

  for (var i in products) {
    const item = products[i];
    if (
      !isValidNumber(item["ratePerUnit"]) ||
      !isValidNumber(item["qty"]) ||
      item["product"] == "" ||
      item["product"] == null
    ) {
      return errorMsg;
    }
  }

  return {
    value: false,
    msg: "",
  };
};
