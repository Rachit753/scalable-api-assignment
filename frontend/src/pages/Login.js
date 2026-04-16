import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      toast.success("Login successful");

      setTimeout(() => navigate("/dashboard"), 800);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
          />
          <button type="submit">Login</button>
        </form>

        <button onClick={() => navigate("/register")}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;