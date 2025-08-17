import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="username" placeholder="Username" onChange={handleChange} />
        <input className="form-control my-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control my-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
