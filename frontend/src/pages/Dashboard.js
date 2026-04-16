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
      setTasks(res.data.data.tasks);
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
        await API.put(`/tasks/${editId}`, { title, status });
        setEditId(null);
      } else {
        await API.post("/tasks", { title, status });
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
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="glass-card" style={{ width: "500px" }}>

        <h2>Dashboard</h2>

        <button onClick={logout}>Logout</button>

        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={handleSubmit}>
          {editId ? "Update Task" : "Add Task"}
        </button>

        <div style={{ marginTop: "20px" }}>
          {tasks.map((task) => (
            <div key={task._id} style={{
              background: "rgba(255,255,255,0.1)",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px"
            }}>
              <strong>{task.title}</strong> ({task.status})

              <div>
                <button onClick={() => editTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;