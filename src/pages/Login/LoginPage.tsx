import { LoginForm } from "./components/LoginForm";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import Logo from "./components/Logo";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
        </div>
        <LoginForm />
        <div className="mt-8">
          <Divider text="Need help?" />
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-main hover:text-main/80 transition-colors"
            >
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
