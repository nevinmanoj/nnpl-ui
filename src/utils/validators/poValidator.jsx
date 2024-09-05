import { errorJson } from "../../constants/ErrorJson";
import { itemsValidator } from "./productsValidator";
export const povalidator = ({ data }) => {
  const {
    ledgerAccount,
    date,
    products,
    distributor,
    billing,
    customer,
    discount,
    roundOff,
  } = data;
  var fail = false;
  var errors = errorJson();

  if (customer == "" || customer == null) {
    errors["customer"] = {
      value: true,
      msg: "Select a valid Customer",
    };
    fail = true;
  }
  if (distributor == "" || distributor == null) {
    errors["distributor"] = {
      value: true,
      msg: "Select a valid Distributor",
    };
    fail = true;
  }
  if (billing == "" || billing == null) {
    errors["billing"] = {
      value: true,
      msg: "Select a valid Billing site",
    };
    fail = true;
  }
  if (date == "" || date == null) {
    errors["date"] = {
      value: true,
      msg: "Select a valid Date",
    };
    fail = true;
  }
  if (ledgerAccount == "" || ledgerAccount == null) {
    errors["ledgerAccount"] = {
      value: true,
      msg: "Select valid values for required fields",
    };
    fail = true;
  }
  const msg = itemsValidator(products, discount, roundOff);
  if (msg.value) {
    fail = true;
    errors["products"] = msg;
  }

  return { errors, fail };
};
