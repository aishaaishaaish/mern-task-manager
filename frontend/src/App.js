import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
