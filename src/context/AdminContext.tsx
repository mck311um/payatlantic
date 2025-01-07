import { createContext } from "react";

interface AdminContextType {
  data: AdminData | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  data: null,
  loading: true,
  error: null,
  fetchData: async () => {},
});

export default AdminContext;
