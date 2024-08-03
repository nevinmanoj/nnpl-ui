import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Po } from "./pages/po";
import { Co } from "./pages/co";
import { Topbar } from "./components/common/topbar";
import { NotficationToast } from "./components/common/notification";
import { SalesInvoice } from "./pages/salesInvoice";
export const AppRoutes = () => {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Topbar />
      <NotficationToast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/po/:id" element={<Po />} />
        <Route path="/co/:id" element={<Co />} />
        <Route path="/sales-invoice/:id" element={<SalesInvoice />} />
      </Routes>
    </div>
  );
};
