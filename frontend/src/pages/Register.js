import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

const [form, setForm] = useState({
    name: "",
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

    await API.post("/auth/register", form);

    alert("Registration successful");

    navigate("/");

    } catch (error) {

    alert(error.response?.data?.message || "Registration failed");

    }
};

return (
    <div style={{ padding: "40px" }}>

    <h2>Register</h2>

    <form onSubmit={handleSubmit}>

        <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        />

        <br /><br />

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
        Register
        </button>

    </form>

    <br />

    <button onClick={() => navigate("/")}>
        Go to Login
    </button>

    </div>
);
}

export default Register;