import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PoContext } from "../context/poProvider";
import { PoInfo } from "../components/po/Info";
import { PoHeader } from "../components/po/Header";
import { Distributor } from "../components/po/distributor";
import { Customer } from "../components/po/Customer";
import { Neural } from "../components/po/Neural";
import { Products } from "../components/po/Products";

import "./po.scss";
import { Tc } from "../components/po/Tc";

export const Po = () => {
  const { id } = useParams();
  const { setPo } = useContext(PoContext);
  useEffect(() => {
    setPo(id);
  }, []);
  return (
    <div className="po-outer">
      <div className="po-body">
        <PoHeader />
        <PoInfo />
        <Products />
        <Distributor />
        <Customer />
        <Neural />
        <Tc />
      </div>
    </div>
  );
};
