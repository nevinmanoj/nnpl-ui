import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Po } from "./pages/po";

import { NotficationToast } from "./components/common/notification";
import { SalesInvoice } from "./pages/salesInvoice";
import { PurchaseInvoice } from "./pages/purchaseInvoice";
import { DocList } from "./pages/DocList";
import { Topbar } from "./components/common/topbar";
export const AppRoutes = () => {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Topbar />
      <NotficationToast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/po" element={<DocList item={"po"} />} />
        <Route
          path="/sales-invoice"
          element={<DocList item={"sales-invoice"} />}
        />
        <Route
          path="/purchase-invoice"
          element={<DocList item={"purchase-invoice"} />}
        />
        <Route path="/po/:id" element={<Po />} />
        <Route path="/sales-invoice/:id" element={<SalesInvoice />} />
        <Route path="/purchase-invoice/:id" element={<PurchaseInvoice />} />
      </Routes>
    </div>
  );
};
