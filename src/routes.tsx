import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/Administration/AdminPage";
import DepartmentsPage from "./pages/Administration/sections/DepartmentsPage";

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
