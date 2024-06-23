import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Po } from "./pages/po";
import { Co } from "./pages/co";
import { Topbar } from "./components/common/topbar";
export const AppRoutes = () => {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/po/:id" element={<Po />} />
        <Route path="/co/:id" element={<Co />} />
      </Routes>
    </>
  );
};
