import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Loader from "../components/Loader";
import AdminContext from "../context/AdminContext";

interface AdminProviderProps {
  children: ReactNode;
}
const AdminProvider = ({ children }: AdminProviderProps) => {
  const { user } = useAuthContext();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await axios.get<AdminData>("/admin", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchData();
  }, [user]);

  return (
    <>
      {loading && <Loader />}
      <AdminContext.Provider value={{ data, loading, error, fetchData }}>
        {children}
      </AdminContext.Provider>
    </>
  );
};

export default AdminProvider;
