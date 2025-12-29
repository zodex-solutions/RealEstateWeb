import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to admin dashboard
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (password === "ADM@#$%009in") {
      localStorage.setItem("isAuthenticated", "true"); // Store authentication state
      navigate("/admin"); // Redirect after login
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-black">
      <div className="w-full max-w-md p-8 0 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">DNS Admin Login</h2>

        {error && (
          <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
        )}

        <div className="mt-6">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3  border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          onClick={handleLogin}
          className="mt-4 w-full p-3 !bg-[#2f5fa7] text-white   font-semibold rounded-lg hover:scale-[102%] transition-all duration-500"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
