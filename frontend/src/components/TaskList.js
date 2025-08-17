import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch tasks
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTasks(res.data))
        .catch((err) => console.log(err));
    }
  }, [token]);

  // ✅ Mark as done
  const markAsDone = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) =>
        task._id === id ? { ...task, completed: true } : task
      ));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id)); // remove from UI
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Your Tasks</h3>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {task.title} - {task.completed ? "✅" : "❌"}
            </span>

            <div>
              {!task.completed && (
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => markAsDone(task._id)}
                >
                  Mark as Done
                </button>
              )}

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
