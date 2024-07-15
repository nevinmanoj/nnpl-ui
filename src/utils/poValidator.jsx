import { isValidNumber } from "./validNumberChecker";
export const povalidator = ({
  tax,
  date,
  products,
  distributor,
  billing,
  customer,
  errors,
}) => {
  var fail = false;
  errors = {
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
  };
  const reqCustomerProperties = [
    "title",
    "address1",
    "address2",
    "city",
    "pin",
    "contact",
    "contactEmail",
    "contactNumber",
  ];
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
  if (tax == "" || tax == null || !isValidNumber(tax)) {
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
