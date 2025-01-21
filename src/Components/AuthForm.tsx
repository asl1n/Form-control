import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Box for form */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8 space-y-6">
        {/* Switch */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-3 font-semibold ${
              activeTab === "login"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`w-1/2 py-3 font-semibold ${
              activeTab === "signup"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Display */}
        <div className="transition-all duration-500">
          {activeTab === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;