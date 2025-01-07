import React, { useState } from "react";
import { Lock, User, Building } from "lucide-react";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";
import { useLogIn } from "../../../hooks/useLogin";

export function LoginForm() {
  const { login, error, loading } = useLogIn();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    tenantCode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleInputChange = (name: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="tenant-code"
        label="Business Code"
        type="text"
        value={formData.tenantCode}
        onChange={handleInputChange("tenantCode")}
        icon={<Building className="h-5 w-5 text-gray-400" />}
        placeholder="Enter your business code"
        name="tenantCode"
        required
      />

      <FormField
        id="username"
        label="Username"
        type="text"
        value={formData.username}
        onChange={handleInputChange("username")}
        icon={<User className="h-5 w-5 text-gray-400" />}
        placeholder="Enter your username"
        name="username"
        required
      />

      <PasswordField
        id="password"
        label="Password"
        value={formData.password}
        onChange={handleInputChange("password")}
        icon={<Lock className="h-5 w-5 text-gray-400" />}
        placeholder="••••••••"
        required
        name="password"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-main focus:ring-main/30 border-gray-300 rounded transition-colors"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-main hover:text-main/80 transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-main hover:bg-main/90"
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main/50 transition-colors`}
      >
        {loading ? "Signing in..." : "Sign in to your account"}
      </button>
    </form>
  );
}
