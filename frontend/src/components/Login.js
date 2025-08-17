import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control my-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
