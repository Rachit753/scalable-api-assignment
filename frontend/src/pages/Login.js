import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.data.token);

      setMessage("Login successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed ");
    }
  };

  return (
    <div className="container">
      <div className="glass-card">

        <h2>Login</h2>

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

        <p>{message}</p>

        <button onClick={() => navigate("/register")}>
          Go to Register
        </button>

      </div>
    </div>
  );
}

export default Login;