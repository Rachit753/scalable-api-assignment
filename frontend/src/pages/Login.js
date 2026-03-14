import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

const [form, setForm] = useState({
    email: "",
    password: ""
});

const navigate = useNavigate();

const handleChange = (e) => {
    setForm({
    ...form,
    [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    const res = await API.post("/auth/login", form);

      // save token
    localStorage.setItem("token", res.data.token);

    alert("Login successful");

    navigate("/dashboard");

    } catch (error) {

    alert(error.response?.data?.message || "Login failed");

    }
};

return (
    <div style={{ padding: "40px" }}>

    <h2>Login</h2>

    <form onSubmit={handleSubmit}>

        <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        />

        <br /><br />

        <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
        Login
        </button>

    </form>

    <br />

    <button onClick={() => navigate("/register")}>
        Go to Register
    </button>

    </div>
);
}

export default Login;