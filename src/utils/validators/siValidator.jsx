import { errorJson } from "../../constants/ErrorJson";
import { itemsValidator } from "./productsValidator";
export const sivalidator = ({ data }) => {
  var fail = false;
  const {
    ledgerAccount,
    date,
    products,
    roundOff,
    billing,
    customer,
    executive,
    discount,
    ref,
  } = data;
  var errors = errorJson();
  if (ref == "" || ref == null) {
    errors["ref"] = {
      value: true,
      msg: "Enter a valid Ref No",
    };
    fail = true;
  }
  if (executive === "" || executive == null) {
    errors["executive"] = {
      value: true,
      msg: "Select a valid Sales Executive",
    };
    fail = true;
  }

  if (customer === "" || customer == null) {
    errors["customer"] = {
      value: true,
      msg: "Select a valid Customer",
    };
    fail = true;
  }

  if (billing === "" || billing == null) {
    errors["billing"] = {
      value: true,
      msg: "Select a valid Billing site",
    };
    fail = true;
  }
  if (date === "" || date == null) {
    errors["date"] = {
      value: true,
      msg: "Select a valid Date",
    };
    fail = true;
  }
  if (ledgerAccount == null) {
    errors["ledgerAccount"] = {
      value: true,
      msg: "Select valid Ledger Account",
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
