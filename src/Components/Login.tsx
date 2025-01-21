import React, { useState } from "react";
import { userData } from "../assets/userData";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [success, setSuccess] = useState("");

  // Form validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      const userExists = userData.some(
        (user) => user.username === value.trim()
      );
      setErrors((prev) => ({
        ...prev,
        username: userExists ? "" : "Username not found.",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.trim() ? "" : "Password is required.",
      }));
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidUser = userData.some(
      (user) =>
        user.username === formData.username.trim() &&
        user.password === formData.password.trim()
    );

    setSuccess(
      isValidUser ? "Login successful!" : "Invalid username or password."
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto p-8"
    >
      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className={`mt-1 w-full px-4 py-3 border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={`mt-1 w-full px-4 py-3 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-3 font-semibold rounded-md shadow text-white ${
          !!errors.username || !!errors.password
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={!!errors.username || !!errors.password}
      >
        Log In
      </button>

      {/* Success or Error Message */}
      {success && (
        <p
          className={`text-sm mt-4 ${
            success === "Login successful!" ? "text-green-500" : "text-red-500"
          }`}
        >
          {success}
        </p>
      )}
    </form>
  );
};

export default Login;