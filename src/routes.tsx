import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/Administration/AdminPage";
import DepartmentsPage from "./pages/Administration/sections/DepartmentsPage";
import PositionsPage from "./pages/Administration/sections/PositionsPage";
import BranchPage from "./pages/Administration/sections/BranchesPage";
import AllowancesPage from "./pages/Administration/sections/AllowancesPage";
import BenefitsPage from "./pages/Administration/sections/BenefitsPage";
import BanksPage from "./pages/Administration/sections/BanksPage";
import DeductionsPage from "./pages/Administration/sections/DeductionsPage";

const router = createBrowserRouter(
  [
    { path: "/", element: <LoginPage /> },
    {
      path: "/app",
      element: <PrivateRoute />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Dashboard /> },

        { path: "administration", element: <AdminPage /> },
        { path: "administration/departments", element: <DepartmentsPage /> },
        { path: "administration/positions", element: <PositionsPage /> },
        { path: "administration/branches", element: <BranchPage /> },
        { path: "administration/allowances", element: <AllowancesPage /> },
        { path: "administration/benefits", element: <BenefitsPage /> },
        { path: "administration/banks", element: <BanksPage /> },
        { path: "administration/deductions", element: <DeductionsPage /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
