import { isValidNumber } from "./validNumberChecker";
export const pivalidator = ({ data }) => {
  var fail = false;
  const {
    ledgerAccount,
    date,
    products,
    roundOff,
    billing,
    distributor,
    discount,
  } = data;
  var errors = {
    date: {
      value: false,
      msg: "",
    },
    distributor: {
      value: false,
      msg: "",
    },
    billing: {
      value: false,
      msg: "",
    },
    products: {
      value: false,
      msg: "",
    },
    customer: {
      value: false,
      msg: "",
    },
    ledgerAccount: {
      value: false,
      msg: "",
    },
  };

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
  if (ledgerAccount == null) {
    errors["ledgerAccount"] = {
      value: true,
      msg: "Select valid Ledger Account",
    };
    fail = true;
  }
  if (roundOff === "" || roundOff === null || !isValidNumber(roundOff)) {
    errors["products"] = {
      value: true,
      msg: "Select valid values for required fields",
    };
    fail = true;
  }
  if (discount === "" || discount === null || !isValidNumber(discount)) {
    errors["products"] = {
      value: true,
      msg: "Select valid values for required fields",
    };
    fail = true;
  }
  if (!errors["products"].value) {
    for (var i in products) {
      const item = products[i];
      if (
        !isValidNumber(item["ratePerUnit"]) ||
        !isValidNumber(item["qty"]) ||
        item["product"] == "" ||
        item["product"] == null
      ) {
        errors["products"] = {
          value: true,
          msg: "Select valid values for required fields",
        };
        fail = true;
        break;
      }
    }
  }

  return { errors, fail };
};
