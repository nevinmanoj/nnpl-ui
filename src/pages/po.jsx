import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PoContext } from "../context/poProvider";
import { DocInfo } from "../components/doc/Info";
import { DocHeader } from "../components/doc/Header";
import { Customer } from "../components/doc/Customer";
import { Neural } from "../components/doc/Neural";
import { PoProducts } from "../components/doc/PoProducts";
import { Tc } from "../components/doc/Tc";
import { CustomDocAccordian } from "../components/doc/customAccordians";
import { Distributor } from "../components/doc/distributor";

import "./po.scss";

export const Po = () => {
  const { id } = useParams();
  const {
    pno,
    setPo,
    distributor,
    billing,
    customer,
    savePo,
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
  } = useContext(PoContext);

  useEffect(() => {
    setPo(id);
  }, []);
  return (
    <div className="po-outer">
      <DocHeader save={savePo} />
      <div className="po-body">
        <DocInfo
          onNoChange={(e) => {}}
          editableNo={false}
          errors={errors}
          title="Purchase Order No."
          value={pno}
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
