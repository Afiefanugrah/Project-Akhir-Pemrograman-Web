import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Mengubah nilai form data saat input berubah
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Validasi input sebelum dikirim
  const isFormValid = () => {
    if (!formData.username || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Input Tidak Lengkap",
        text: "Mohon isi username dan password.",
      });
      return false;
    }
    return true;
  };

  // Mengirim data login ke server
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return; // Hentikan jika form tidak valid

    try {
      console.log("Data yang dikirim ke API:", formData);

      const response = await axios.post(
        "http://localhost:3200/api/admin/login",
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }, // Pastikan cookie dikirim
      );

      console.log("Login response:", response.data);

      if (response.status === 200 && response.data.metadata) {
        Swal.fire({
          icon: "success",
          title: "Login berhasil!",
          text: "Selamat datang, Anda berhasil login.",
        });

        // Reset form
        setFormData({
          username: "",
          password: "",
        });

        // Arahkan ke halaman dashboard
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login gagal",
          text: response.data.error || "Username atau password salah",
        });
      }
    } catch (error) {
      console.error("Error during login:", error.response || error.message);

      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: error.response?.data?.message || error.message || "Terjadi kesalahan saat login.",
      });
    }
  };

  // Tombol untuk kembali ke halaman sebelumnya
  const handleBackClick = () => {
    navigate("/"); // Navigasi ke halaman awal
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
        <button type="submit" className="btn btn-primary">Login</button>
        <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
      </div>
    </form>
  );
};

export default LoginAdmin;
