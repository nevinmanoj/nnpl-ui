import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DocInfo } from "../components/doc/Info";
import { DocHeader } from "../components/doc/Header";
import { Distributor } from "../components/doc/distributor";
import { Neural } from "../components/doc/Neural";
import { CustomDocAccordian } from "../components/doc/customAccordians";
import { LedgerAccount } from "../components/doc/ledgerAccount";
import { Products } from "../components/doc/Products";
import { PIContext } from "../context/piProvider";
import { Customer } from "../components/doc/Customer";
import { useNavigate, useLocation } from "react-router-dom";
export const PurchaseInvoice = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const {
    setPi,
    savePi,
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
  } = useContext(PIContext);

  const saveNewPi = async () => {
    const newId = await savePi();
    if (id == "new" && newId != null) {
      navigator("/purchase-invoice/" + newId);
    }
  };

  useEffect(() => {
    setPi(id);
  }, []);
  return (
    <div className="po-outer">
      <DocHeader save={saveNewPi} />
      <div className="po-body">
        <DocInfo
          onNoChange={(e) => setref(e.target.value)}
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
          children={<Neural billing={billing} setBilling={setBilling} />}
        />
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={distributor}
          label="Distributor"
          children={
            <Distributor
              distributor={distributor}
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
        />
        <div className="divider" />
        <Products
          ledgerAccount={ledgerAccount}
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
