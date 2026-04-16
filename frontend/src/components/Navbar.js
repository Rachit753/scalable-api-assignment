import React from "react";

function Navbar({ user, onLogout }) {

  const toggleTheme = () => {
    document.body.classList.toggle("light-mode");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)"
    }}>
      <h3>Task Manager</h3>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        
        <button onClick={toggleTheme} style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "18px"
        }}>
          🌗
        </button>

        <span style={{ marginRight: "15px" }}>
          {user?.name || "User"}
        </span>

        <button onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;