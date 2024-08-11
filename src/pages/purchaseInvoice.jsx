import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DocInfo } from "../components/doc/Info";
import { DocHeader } from "../components/doc/Header";
import { Distributor } from "../components/doc/distributor";
import { Neural } from "../components/doc/Neural";
import { CustomDocAccordian } from "../components/doc/customAccordians";
import { LedgerAccount } from "../components/doc/ledgerAccount";
import { Products } from "../components/doc/Products";
import { Customer } from "../components/doc/Customer";
import { DocContext } from "../context/docProvider";
export const PurchaseInvoice = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const {
    saveDoc,
    setDoc,
    ref,
    date,
    setDate,
    distributor,
    billing,
    setBilling,
    setdistributor,
    errors,
    ledgerAccount,
    setLedgerAccount,
    setProducts,
    products,
    roundOff,
    setRoundOff,
    customer,
    isNew,
    setCustomer,
    setIsNew,
    setref,
    status,
  } = useContext(DocContext);

  const saveNewPi = async () => {
    const newId = await saveDoc();
    if (id == "new" && newId != null) {
      navigator("/purchase-invoice/" + newId);
    }
  };

  useEffect(() => {
    setDoc({ i: id, type: "purchase-invoice" });
  }, [id]);
  return (
    <div className="po-outer">
      <DocHeader save={saveNewPi} status={status} />
      <div className="po-body">
        <DocInfo
          onNoChange={(e) => setref(e.target.value)}
          status={status}
          editableNo={true}
          errors={errors}
          title="Purchase Invoice No."
          value={ref}
          date={date}
          setDate={setDate}
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
          errors={errors}
          value={distributor}
          label="Distributor"
          children={
            <Distributor
              distributor={distributor}
              status={status}
              setDistributor={setdistributor}
            />
          }
        />{" "}
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={customer}
          label="Customer"
          children={
            <Customer
              customer={customer}
              status={status}
              isNew={isNew}
              setCustomer={setCustomer}
              setIsNew={setIsNew}
              errors={errors}
            />
          }
        />
        <div className="divider" />
        <LedgerAccount
          errors={errors}
          ledger={ledgerAccount}
          setLedger={setLedgerAccount}
          status={status}
        />
        <div className="divider" />
        <Products
          ledgerAccount={ledgerAccount}
          status={status}
          roundOff={roundOff}
          products={products}
          setProducts={setProducts}
          errors={errors}
          setRoundOff={setRoundOff}
        />
      </div>
    </div>
  );
};
