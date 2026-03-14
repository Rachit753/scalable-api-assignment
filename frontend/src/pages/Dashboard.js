import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [status, setStatus] = useState("pending");
const [editId, setEditId] = useState(null);

const navigate = useNavigate();

const fetchTasks = async () => {
    try {

    const res = await API.get("/tasks");

    setTasks(res.data);

    } catch (error) {

    alert("Failed to fetch tasks");

    }
};

useEffect(() => {
    fetchTasks();
}, []);

const handleSubmit = async () => {

    try {

    if (editId) {

        await API.put(`/tasks/${editId}`, {
        title,
        status
        });

        setEditId(null);

    } else {

        await API.post("/tasks", {
        title,
        status
        });

    }

    setTitle("");
    setStatus("pending");

    fetchTasks();

    } catch (error) {

    alert("Operation failed");

    }
};

const editTask = (task) => {

    setTitle(task.title);
    setStatus(task.status);
    setEditId(task._id);

};


const deleteTask = async (id) => {

    try {

    await API.delete(`/tasks/${id}`);

    fetchTasks();

    } catch (error) {

    alert("Delete failed");

    }
};


const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

};

return (
    <div style={{ padding: "40px" }}>

    <h2>Dashboard</h2>

    <button onClick={logout}>Logout</button>

    <br /><br />

    <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />

    <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginLeft: "10px" }}
    >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
    </select>

    <button
        onClick={handleSubmit}
        style={{ marginLeft: "10px" }}
    >
        {editId ? "Update Task" : "Add Task"}
    </button>

    <ul style={{ marginTop: "20px" }}>

        {tasks.map((task) => (

        <li key={task._id}>

            {task.title} — ({task.status})

            <button
            onClick={() => editTask(task)}
            style={{ marginLeft: "10px" }}
            >
            Edit
            </button>

            <button
            onClick={() => deleteTask(task._id)}
            style={{ marginLeft: "10px" }}
            >
            Delete
            </button>

        </li>

        ))}

    </ul>

    </div>
);
}

export default Dashboard;