import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DocInfo } from "../components/doc/Info";
import { DocHeader } from "../components/doc/Header";
import { Customer } from "../components/doc/Customer";
import { Neural } from "../components/doc/Neural";
import { CustomDocAccordian } from "../components/doc/customAccordians";
import { LedgerAccount } from "../components/doc/ledgerAccount";
import { SIContext } from "../context/siProvider";
import { Products } from "../components/doc/Products";

export const SalesInvoice = () => {
  const { id } = useParams();
  const {
    setSi,
    saveSi,
    sino,
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
    setSino,
  } = useContext(SIContext);

  useEffect(() => {
    setSi(id);
  }, []);
  return (
    <div className="po-outer">
      <DocHeader save={saveSi} />
      <div className="po-body">
        <DocInfo
          onNoChange={(e) => setSino(e.target.value)}
          editableNo={true}
          errors={errors}
          title="Sales Invoice No."
          value={sino}
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
          value={customer}
          errors={errors}
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
