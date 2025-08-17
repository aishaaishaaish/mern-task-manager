import React from "react";
import { Link,useNavigate  } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/login"); // redirect user
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <div>
          <Link className="btn btn-light mx-2" to="/tasks">View All Tasks</Link>
          <Link className="btn btn-success mx-2" to="/add-task">Add Task</Link>
          <Link className="btn btn-primary mx-2" to="/login">Login</Link>
          <Link className="btn btn-warning mx-2" to="/register">Register</Link>
          <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
