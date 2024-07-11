import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PoContext } from "../context/poProvider";
import { PoInfo } from "../components/po/Info";
import { PoHeader } from "../components/po/Header";
import { Customer } from "../components/po/Customer";
import { Neural } from "../components/po/Neural";
import { Products } from "../components/po/Products";

import "./po.scss";
import { Tc } from "../components/po/Tc";
import { CustomPoAccordian } from "../components/po/customAccordians";
import { Distributor } from "../components/po/distributor";

export const Po = () => {
  const { id } = useParams();
  const { setPo, distributor, billing, customer } = useContext(PoContext);

  useEffect(() => {
    setPo(id);
  }, []);
  return (
    <div className="po-outer">
      <PoHeader />
      <div className="po-body">
        <PoInfo />
        <div className="divider" />
        <CustomPoAccordian
          value={distributor}
          label="Distributor"
          children={<Distributor />}
        />
        <div className="divider" />
        <CustomPoAccordian
          value={billing}
          label="Billing"
          children={<Neural />}
        />
        <div className="divider" />
        <Products />
        <div className="divider" />
        <CustomPoAccordian
          value={customer}
          label="Customer"
          children={<Customer />}
        />
        <div className="divider" />
        <Tc />
      </div>
    </div>
  );
};
