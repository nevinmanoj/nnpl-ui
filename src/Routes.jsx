import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Po } from "./pages/po";

import { NotficationToast } from "./components/common/notification";
import { SalesInvoice } from "./pages/salesInvoice";
import { PurchaseInvoice } from "./pages/purchaseInvoice";
import { DocList } from "./pages/DocList";
import { Topbar } from "./components/common/topbar";

import { docOptions } from "./constants/docOptions";
import { NoPathPage } from "./pages/NoPathPage";
export const AppRoutes = () => {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Topbar />
      <NotficationToast />
      <Routes>
        {docOptions.map((v, i) => (
          <>
            <Route path={"/" + v.path} element={<DocList item={v.path} />} />
            <Route
              path={"/" + v.path + "/:id"}
              element={getDocDetailPage(v.path)}
            />
          </>
        ))}
        <Route path="*" element={<NoPathPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

const getDocDetailPage = (item) => {
  switch (item) {
    case "po":
      return <Po />;
    case "sales-invoice":
      return <SalesInvoice />;
    case "purchase-invoice":
      return <PurchaseInvoice />;
  }
};
