import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../../styles/frompengunjungPage.css";

const FromPengunjung = () => { 
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here if needed
  };

  const handleKrimClick = () => {
    alert('Form berhasil dikirim!');
  };

  const handleRegisClick = () => {
    navigate('/register');
  };

  return (
    <Container className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nim" className="form-label">NIM</label>
          <input type="text" className="form-control" id="nim" placeholder="Masukkan NIM" />
        </div>
        <div className="mb-3">
          <label htmlFor="nama_kegiatan" className="form-label">Keperluan</label>
          <input type="text" className="form-control" id="nama_kegiatan" placeholder="Masukkan Kegiatan" />
        </div>
        
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-primary" onClick={handleKrimClick}>Kirim</button>
          <button type="button" className="btn btn-secondary" onClick={handleRegisClick}>Register</button>
        </div>
      </form>
    </Container>
  );
};

export default FromPengunjung;
