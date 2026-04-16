import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      setMessage("Registration successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="glass-card">

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />

          <button type="submit">Register</button>

        </form>

        <p>{message}</p>

        <button onClick={() => navigate("/")}>
          Go to Login
        </button>

      </div>
    </div>
  );
}

export default Register;