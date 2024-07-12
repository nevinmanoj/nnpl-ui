import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Po } from "./pages/po";
import { Co } from "./pages/co";
import { Topbar } from "./components/common/topbar";
import { NotficationToast } from "./components/common/notification";
export const AppRoutes = () => {
  return (
    <div>
      <Topbar />
      <NotficationToast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/po/:id" element={<Po />} />
        <Route path="/co/:id" element={<Co />} />
      </Routes>
    </div>
  );
};
