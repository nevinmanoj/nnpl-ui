import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { DocInfo } from "../components/doc/Info";
import { DocHeader } from "../components/doc/Header";
import { LedgerAccount } from "../components/doc/ledgerAccount";
import { Customer } from "../components/doc/Customer";
import { Neural } from "../components/doc/Neural";
import { Products } from "../components/doc/Products";
import { Tc } from "../components/doc/Tc";
import { CustomDocAccordian } from "../components/doc/customAccordians";
import { Distributor } from "../components/doc/distributor";

import "./po.scss";
import { DocContext } from "../context/docProvider";
import { UserContext } from "../context/userProvider";
import { DocLoading } from "../components/doc/docLoading";

export const Po = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const {
    setProducts,
    products,
    roundOff,
    setRoundOff,
    ref,
    setDoc,
    distributor,
    billing,
    customer,
    saveDoc,
    setErrors,
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
    status,
    discount,
    setDiscount,
    downloadExcel,
    saving,
    downloading,
    loading,
  } = useContext(DocContext);
  const { token } = useContext(UserContext);
  useEffect(() => {
    setDoc({ i: id, type: "po" });
  }, [id, token]);

  const saveNewPo = async () => {
    const newId = await saveDoc();
    if (newId != null) {
      navigator("/po/" + newId);
    }
  };
  return loading ? (
    <DocLoading />
  ) : (
    <div className="po-outer">
      <DocHeader
        save={saveNewPo}
        status={status}
        download={downloadExcel}
        id={ref}
        saving={saving}
        downloading={downloading}
      />
      <div className="po-body">
        <DocInfo
          status={status}
          onNoChange={(e) => {}}
          editableNo={false}
          errors={errors}
          setErrors={setErrors}
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
              status={status}
              distributor={distributor}
              setDistributor={setDistributor}
              errors={errors}
              setErrors={setErrors}
            />
          }
        />
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={billing}
          label="Billing"
          children={
            <Neural
              status={status}
              billing={billing}
              setBilling={setBilling}
              errors={errors}
              setErrors={setErrors}
            />
          }
        />
        <div className="divider" />
        <LedgerAccount
          status={status}
          errors={errors}
          ledger={ledgerAccount}
          setLedger={setLedgerAccount}
          setErrors={setErrors}
        />
        <div className="divider" />
        {/* <PoProducts status={status} /> */}
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
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={customer}
          label="Customer"
          children={
            <Customer
              status={status}
              customer={customer}
              isNew={isNew}
              setCustomer={setCustomer}
              setIsNew={setIsNew}
              errors={errors}
              setErrors={setErrors}
            />
          }
        />
        <div className="divider" />
        <Tc status={status} tc={tc} setTc={setTc} />
      </div>
      <DocHeader
        save={saveNewPo}
        status={status}
        download={downloadExcel}
        id={ref}
      />
    </div>
  );
};
