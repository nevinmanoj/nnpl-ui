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
import { UserContext } from "../context/userProvider";
import { DocLoading } from "../components/doc/docLoading";

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
    loading,
    setErrors,
    downloading,
    saving,
  } = useContext(DocContext);
  const { token } = useContext(UserContext);
  useEffect(() => {
    setDoc({ i: id, type: "sales-invoice" });
  }, [id, token]);
  const saveNew = async () => {
    const newId = await saveDoc();
    if (id == "new" && newId != null) {
      navigator("/sales-invoice/" + newId);
    }
  };
  return loading ? (
    <DocLoading />
  ) : (
    <div className="po-outer">
      <DocHeader
        save={saveNew}
        status={status}
        saving={saving}
        downloading={downloading}
      />
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
          setErrors={setErrors}
        />
        <div className="divider" />
        <Executive
          executive={executive}
          setExecutive={setExecutive}
          status={status}
          errors={errors}
          setErrors={setErrors}
        />
        <div className="divider" />
        <CustomDocAccordian
          errors={errors}
          value={billing}
          label="Billing"
          children={
            <Neural
              billing={billing}
              setBilling={setBilling}
              status={status}
              errors={errors}
              setErrors={setErrors}
            />
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
              setErrors={setErrors}
            />
          }
        />
        <div className="divider" />
        <LedgerAccount
          errors={errors}
          status={status}
          ledger={ledgerAccount}
          setLedger={setLedgerAccount}
          setErrors={setErrors}
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
          setErrors={setErrors}
          setDiscount={setDiscount}
        />
      </div>
    </div>
  );
};
