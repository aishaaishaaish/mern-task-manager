import React, { useState } from "react";
import axios from "axios";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title cannot be empty!");

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle(""); // clear input
      if (onTaskAdded) onTaskAdded(); // refresh TaskList
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h4>Add Task</h4>
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          className="form-control me-2"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default TaskForm;
