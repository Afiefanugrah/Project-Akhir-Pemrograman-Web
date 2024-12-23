import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/registrasiPengunjung.css";
import Swal from 'sweetalert2';

const RegistrasiPengunjung = () => {
  
  const [formData, setFormData] = useState({
    nim: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    email_umrah: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3200/api/pengunjung/registers", formData);
      // Success alert
      Swal.fire({
        icon: 'success',
        title: 'Registrasi berhasil!',
        text: 'Data Anda telah berhasil disimpan.',
      });

      // Clear form after submission
      setFormData({
        nim: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        email_umrah: ""
      });

      navigate('/');
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Registrasi gagal',
        text: error.response?.data?.error || "Terjadi kesalahan",
      });
    }
  };

  const handlebackClick = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form-container">
      <div className="mb-3">
        <label htmlFor="nim" className="form-label">NIM</label>
        <input type="text" className="form-control" id="nim" placeholder="Masukkan NIM" value={formData.nim} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
        <input type="text" className="form-control" id="nama_lengkap" placeholder="Masukkan Nama Lengkap" value={formData.nama_lengkap} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="jenis_kelamin" className="form-label">Jenis Kelamin</label>
        <select className="form-control" id="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
          <option value="">Pilih Jenis Kelamin</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="email_umrah" className="form-label">Email UMRAH</label>
        <input type="email" className="form-control" id="email_umrah" placeholder="Masukkan Email UMRAH" value={formData.email_umrah} onChange={handleChange} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Daftar</button>
        <button type="button" className="btn btn-primary" onClick={handlebackClick}>Back</button>
      </div>
    </form>
  );
};

export default RegistrasiPengunjung;
