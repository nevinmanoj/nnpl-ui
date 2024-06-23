import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PoContext } from "../context/poProvider";
import { PoHeader } from "../components/po/Header";
import { PoFooter } from "../components/po/Footer";
import { Distributor } from "../components/po/distributor";
import { Customer } from "../components/po/Customer";
import { Neural } from "../components/po/Neural";
import { Products } from "../components/po/Products";

import "./po.scss";

export const Po = () => {
  const { id } = useParams();
  const { setPo } = useContext(PoContext);
  useEffect(() => {
    setPo(id);
    console.log("hrererererere");
  }, []);
  return (
    <div className="po-outer">
      <PoHeader />
      <div className="po-body">
        <Products />
        <Distributor />
        <Customer />
        <Neural />
      </div>

      <PoFooter />
    </div>
  );
};
