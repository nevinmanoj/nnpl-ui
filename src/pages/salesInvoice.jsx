import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DocInfo } from "../components/doc/Info";
import { DocHeader } from "../components/doc/Header";
import { Customer } from "../components/doc/Customer";
import { Neural } from "../components/doc/Neural";
import { CustomDocAccordian } from "../components/doc/customAccordians";
import { LedgerAccount } from "../components/doc/ledgerAccount";
import { Products } from "../components/doc/Products";
import { Executive } from "../components/doc/Executive";
import { DocContext } from "../context/docProvider";

export const SalesInvoice = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const {
    setDoc,
    saveDoc,
    ref,
    date,
    setDate,
    customer,
    billing,
    setBilling,
    setCustomer,
    isNew,
    setIsNew,
    errors,
    ledgerAccount,
    setLedgerAccount,
    roundOff,
    products,
    setProducts,
    setRoundOff,
    setref,
    executive,
    setExecutive,
    status,
    discount,
    setDiscount,
  } = useContext(DocContext);

  useEffect(() => {
    setDoc({ i: id, type: "sales-invoice" });
  }, [id]);
  const saveNew = async () => {
    const newId = await saveDoc();
    if (id == "new" && newId != null) {
      navigator("/sales-invoice/" + newId);
    }
  };
  return (
    <div className="po-outer">
      <DocHeader save={saveNew} status={status} />
      <div className="po-body">
        <DocInfo
          onNoChange={(e) => setref(e.target.value)}
          editableNo={true}
          errors={errors}
          title="Sales Invoice No."
          value={ref}
          date={date}
          setDate={setDate}
          status={status}
        />
        <div className="divider" />
        <Executive
          executive={executive}
          setExecutive={setExecutive}
          errors={errors}
          status={status}
        />
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={billing}
          label="Billing"
          children={
            <Neural billing={billing} setBilling={setBilling} status={status} />
          }
        />
        <div className="divider" />
        <CustomDocAccordian
          value={customer}
          errors={errors}
          label="Customer"
          children={
            <Customer
              customer={customer}
              isNew={isNew}
              status={status}
              setCustomer={setCustomer}
              setIsNew={setIsNew}
              errors={errors}
            />
          }
        />
        <div className="divider" />
        <LedgerAccount
          errors={errors}
          status={status}
          ledger={ledgerAccount}
          setLedger={setLedgerAccount}
        />
        <div className="divider" />
        <Products
          ledgerAccount={ledgerAccount}
          roundOff={roundOff}
          products={products}
          status={status}
          setProducts={setProducts}
          errors={errors}
          setRoundOff={setRoundOff}
          discount={discount}
          setDiscount={setDiscount}
        />
      </div>
    </div>
  );
};
