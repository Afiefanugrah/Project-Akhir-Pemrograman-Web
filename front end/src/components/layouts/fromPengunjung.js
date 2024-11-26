import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import "../../styles/frompengunjungPage.css";

const FromPengunjung = () => {
  const [formData, setFormData] = useState({
    nim: "",
    keperluan: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.nim || !formData.keperluan) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Semua field harus diisi!',
      });
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3200/api/kunjungan/masuk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Data berhasil dikirim!',
        });
        setFormData({ nim: "", keperluan: "" });
      } else {
        const data = await response.json();
  
        // Jika message berupa array, gabungkan dengan newline
        const errorMessage = Array.isArray(data.message)
          ? data.message.join('\n') // Menggabungkan array dengan newline
          : data.message;
  
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: errorMessage || 'Gagal mengirim data!',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Terjadi kesalahan saat menghubungi server.',
      });
    }
  };
  

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="custom-peng-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nim" className="form-label">NIM</label>
          <input
            type="text"
            className="form-control"
            id="nim"
            placeholder="Masukkan NIM"
            value={formData.nim}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="keperluan" className="form-label">Keperluan</label>
          <input
            type="text"
            className="form-control"
            id="keperluan"
            placeholder="Masukkan Keperluan"
            value={formData.keperluan}
            onChange={handleInputChange}
          />
          <div id="textHelp" className="form-text">
            Silakan masukkan keperluan Anda di atas
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Kirim</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FromPengunjung;
