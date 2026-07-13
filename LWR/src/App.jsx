import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import EntityFormPage from "./pages/EntityFormPage";
import EntityReportPage from "./pages/EntityReportPage";
import CoordinatorFormPage from "./pages/CoordinatorFormPage";
import CoordinatorReportPage from "./pages/CoordinatorReportPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="forms/:entityKey" element={<EntityFormPage />} />
          <Route path="reports/:entityKey" element={<EntityReportPage />} />
          <Route path="admin/coordinators" element={<CoordinatorFormPage />} />
          <Route path="admin/coordinators/report" element={<CoordinatorReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}