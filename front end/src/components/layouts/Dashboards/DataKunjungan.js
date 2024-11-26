import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import "../../../styles/Dashboards/DataKunjungan.css"; // Pastikan path CSS benar

const Datakunjungan = () => {
  const [dataKunjungan, setDataKunjungan] = useState([]);

  // Mengambil data kunjungan dari API
  useEffect(() => {
    fetch("http://localhost:3200/api/kunjungan")
      .then((response) => response.json())
      .then((data) => {
        setDataKunjungan(data.data); // Menyimpan data kunjungan yang diterima dari API
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fungsi untuk menghapus data kunjungan
  const handleDelete = (id) => {
    fetch(`http://localhost:3200/api/kunjungan/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Jika berhasil menghapus, perbarui state dengan menghapus data yang sudah dihapus
        setDataKunjungan((prevData) => prevData.filter((kunjungan) => kunjungan.id !== id));
        alert("Data kunjungan berhasil dihapus.");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("Terjadi kesalahan saat menghapus data kunjungan.");
      });
  };

  return (
    <Container>
      <h1>Data Kunjungan</h1>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>NIM</th>
              <th>Keperluan</th>
              <th>Tanggal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataKunjungan.map((kunjungan, index) => (
              <tr key={kunjungan.id}>
                <td>{index + 1}</td>
                <td>{kunjungan.nim}</td>
                <td>{kunjungan.keperluan}</td>
                <td>{new Date(kunjungan.created_at).toLocaleString()}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(kunjungan.id)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Datakunjungan;
