import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DocInfo } from "../components/doc/Info";
import { DocHeader } from "../components/doc/Header";
import { LedgerAccount } from "../components/doc/ledgerAccount";
import { Customer } from "../components/doc/Customer";
import { Neural } from "../components/doc/Neural";
import { PoProducts } from "../components/doc/PoProducts";
import { Tc } from "../components/doc/Tc";
import { CustomDocAccordian } from "../components/doc/customAccordians";
import { Distributor } from "../components/doc/distributor";

import "./po.scss";
import { DocContext } from "../context/docProvider";

export const Po = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const {
    ref,
    setDoc,
    distributor,
    billing,
    customer,
    saveDoc,
    date,
    setDate,
    setDistributor,
    setBilling,
    setCustomer,
    isNew,
    setIsNew,
    errors,
    tc,
    setTc,
    ledgerAccount,
    setLedgerAccount,
  } = useContext(DocContext);

  useEffect(() => {
    setDoc({ i: id, type: "po" });
  }, [id]);

  const saveNewPo = async () => {
    const newId = await saveDoc();
    if (id == "new" && newId != null) {
      navigator("/po/" + newId);
    }
  };
  return (
    <div className="po-outer">
      <DocHeader save={saveNewPo} />
      <div className="po-body">
        <DocInfo
          onNoChange={(e) => {}}
          editableNo={false}
          errors={errors}
          title="Purchase Order No."
          value={ref}
          date={date}
          setDate={setDate}
        />
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={distributor}
          label="Distributor"
          children={
            <Distributor
              distributor={distributor}
              setDistributor={setDistributor}
            />
          }
        />
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={billing}
          label="Billing"
          children={<Neural billing={billing} setBilling={setBilling} />}
        />
        <div className="divider" />
        <LedgerAccount
          errors={errors}
          ledger={ledgerAccount}
          setLedger={setLedgerAccount}
        />
        <div className="divider" />
        <PoProducts />
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
        <Tc tc={tc} setTc={setTc} />
      </div>
    </div>
  );
};
