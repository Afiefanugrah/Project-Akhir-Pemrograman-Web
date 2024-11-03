import React, { useState } from "react";
import axios from "axios";
import "../../styles/registrasiPengunjung.css"

const RegistrasiPengunjung = () => {
  const [formData, setFormData] = useState({
    nim: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    email_umrah: ""
  });

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
      console.log("Response:", response.data);
      alert("Registrasi berhasil!");

      // Clear form after submission
      setFormData({
        nim: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        email_umrah: ""
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Registrasi gagal: " + (error.response?.data?.error || "Terjadi kesalahan"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      {/* <div className="mb-3">
        <label className="form-label">Jenis Kelamin</label>
          <div className="d-flex">
              <div className="form-check me-3">
                  <input
                      type="radio"
                      className="form-check-input"
                      id="jenis_kelamin_laki"
                      name="jenis_kelamin"
                      value="laki-laki"
                      checked={formData.jenis_kelamin === "laki-laki"}
                      onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="jenis_kelamin_laki">
                      Laki-laki
                  </label>
              </div>
              <div className="form-check">
                  <input
                      type="radio"
                      className="form-check-input"
                      id="jenis_kelamin_perempuan"
                      name="jenis_kelamin"
                      value="perempuan"
                      checked={formData.jenis_kelamin === "perempuan"}
                      onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="jenis_kelamin_perempuan">
                      Perempuan
                  </label>
              </div>
          </div>
      </div> */}

      <div className="mb-3">
        <label htmlFor="email_umrah" className="form-label">Email UMRAH</label>
        <input type="email" className="form-control" id="email_umrah" placeholder="Masukkan Email UMRAH" value={formData.email_umrah} onChange={handleChange} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default RegistrasiPengunjung;
