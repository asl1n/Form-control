import React, { useState } from "react";
import { userData } from "../assets/userData";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface Errors {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({
    username: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      const isTaken = userData.some((user) => user.username === value.trim());
      setErrors((prev) => ({
        ...prev,
        username: isTaken ? "Username already taken." : "",
      }));
    }

    if (name === "email") {
      const isValidEmail = /\S+@\S+\.\S+/.test(value.trim());
      setErrors((prev) => ({
        ...prev,
        email: isValidEmail ? "" : "Invalid email format.",
      }));
    }

    if (name === "password") {
      const issues: string[] = [];
      if (value.length < 8) issues.push("at least 8 characters");
      if (!/[A-Z]/.test(value)) issues.push("an uppercase letter");
      if (!/[!@#$%^&*]/.test(value)) issues.push("a special character");
      setErrors((prev) => ({
        ...prev,
        password: issues.length ? `Password needs ${issues.join(", ")}.` : "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const { username, email, password } = formData;
    const newErrors: Errors = { username: "", email: "", password: "" };

    const isTaken = userData.some((user) => user.username === username.trim());
    if (!username.trim() || isTaken) {
      newErrors.username = isTaken
        ? "Username already taken."
        : "Username is required.";
    }

    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = "Invalid email format.";
    }

    const passwordIssues: string[] = [];
    if (password.length < 8) passwordIssues.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) passwordIssues.push("an uppercase letter");
    if (!/[!@#$%^&*]/.test(password))
      passwordIssues.push("a special character");
    if (passwordIssues.length) {
      newErrors.password = `Password needs ${passwordIssues.join(", ")}.`;
    }

    setErrors(newErrors);

    // Check errors
    if (!newErrors.username && !newErrors.email && !newErrors.password) {
      setSuccessMessage("Signup successful!");
      setFormData({ username: "", email: "", password: "" });
      setErrors({ username: "", email: "", password: "" });
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto p-8 "
    >
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`mt-1 w-full px-4 py-3 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

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

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
        disabled={!!errors.username || !!errors.email || !!errors.password}
      >
        Sign Up
      </button>

      {successMessage && (
        <p className="text-green-500 text-sm mt-4">{successMessage}</p>
      )}
    </form>
  );
};

export default Signup;