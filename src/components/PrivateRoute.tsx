import { Outlet } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute = () => {
  // const { user, isLoading } = useAuthContext();

  // if (!user && !isLoading) {
  //   return <Navigate to="/" />;
  // }

  // if (!user && !isLoading) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;
