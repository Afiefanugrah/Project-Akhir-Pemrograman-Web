import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Ensure this import is present

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    username: "admin",
    password: "admin",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with:", formData);
  };

  const handleLoginClick = () => {
    navigate('/dashboard'); // Ensure this calls navigate correctly
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          placeholder="Masukkan Username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Masukkan Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={handleLoginClick}>Login</button>
        <button type="submit" className="btn btn-primary" onClick={handleBackClick}>back</button>
      </div>
    </form>
  );
};

export default LoginAdmin;
