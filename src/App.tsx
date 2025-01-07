import { registerLicense } from "@syncfusion/ej2-base";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthContextProvider } from "./context/AuthContext";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://devvize-hris-server.devvize.com";
} else {
  axios.defaults.baseURL = "http://localhost:5001";
}

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9feHVVRGZfVUV0WEI="
);

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
