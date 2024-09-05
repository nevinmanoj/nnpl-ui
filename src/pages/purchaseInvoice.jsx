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
import { UserContext } from "../context/userProvider";
import { DocLoading } from "../components/doc/docLoading";
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
    setDistributor,
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
    discount,
    setDiscount,
    loading,
    setErrors,
    downloading,
    saving,
  } = useContext(DocContext);
  const { token } = useContext(UserContext);
  const saveNewPi = async () => {
    const newId = await saveDoc();
    if (id == "new" && newId != null) {
      navigator("/purchase-invoice/" + newId);
    }
  };
  useEffect(() => {
    const setData = async () => {
      const res = await setDoc({ i: id, type: "purchase-invoice" });
      if (!res) {
        navigator("/purchase-invoice/new");
      }
    };
    setData();
  }, [id, token]);

  return loading ? (
    <DocLoading />
  ) : (
    <div className="po-outer">
      <DocHeader
        save={saveNewPi}
        status={status}
        saving={saving}
        downloading={downloading}
      />
      <div className="po-body">
        <DocInfo
          onNoChange={(e) => setref(e.target.value)}
          status={status}
          editableNo={true}
          errors={errors}
          setErrors={setErrors}
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
        <CustomDocAccordian
          errors={errors}
          value={distributor}
          label="Distributor"
          children={
            <Distributor
              distributor={distributor}
              status={status}
              setDistributor={setDistributor}
              errors={errors}
              setErrors={setErrors}
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
          setErrors={setErrors}
        />
        <div className="divider" />
        <Products
          discount={discount}
          setDiscount={setDiscount}
          ledgerAccount={ledgerAccount}
          status={status}
          roundOff={roundOff}
          products={products}
          setProducts={setProducts}
          errors={errors}
          setRoundOff={setRoundOff}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
};
