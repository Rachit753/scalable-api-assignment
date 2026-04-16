import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data.tasks);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleSubmit = async () => {
    try {
      if (!title.trim()) return toast.error("Title required");

      if (editId) {
        await API.put(`/tasks/${editId}`, { title, status });
        toast.success("Task updated");
        setEditId(null);
      } else {
        await API.post("/tasks", { title, status });
        toast.success("Task added");
      }

      setTitle("");
      fetchTasks();

    } catch {
      toast.error("Operation failed");
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setStatus(task.status);
    setEditId(task._id);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    toast.success("Deleted");
    fetchTasks();
  };

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div>

      <Navbar user={user} onLogout={logout} />

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px"
      }}>

        <div className="glass-card" style={{ width: "600px" }}>

          <h2>Dashboard</h2>

          <div style={{ display: "flex", gap: "10px" }}>
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
          </div>

          <button onClick={handleSubmit}>
            {editId ? "Update Task" : "Add Task"}
          </button>

          <div style={{ marginTop: "20px" }}>
            {tasks.map((task) => (
              <div key={task._id} className="task-card">

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.status}</p>
                  </div>

                  <div>
                    <button onClick={() => editTask(task)}>Edit</button>
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;