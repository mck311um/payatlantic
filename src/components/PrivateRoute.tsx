import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = () => {
  const { user, isLoading } = useAuthContext();

  if (!user && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;
