import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import "../../../styles/Dashboards/DataKunjungan.css";
import Swal from "sweetalert2";


const DataKunjungan = () => {
  const [dataKunjungan, setDataKunjungan] = useState([]);

  // Fetch data kunjungan from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3200/api/kunjungan");
        const result = await response.json();
        setDataKunjungan(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

  // Handle delete operation
  if (confirmResult.isConfirmed) {
    try {
      const response = await fetch(`http://localhost:3200/api/kunjungan/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDataKunjungan((prevData) => prevData.filter((kunjungan) => kunjungan.id !== id));
        Swal.fire("Dihapus!", "Data kunjungan berhasil dihapus.", "success");
      } else {
        throw new Error("Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire("Error", "Terjadi kesalahan saat menghapus data kunjungan.", "error");
    }
  }
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
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKunjungan.length > 0 ? (
              dataKunjungan.map((kunjungan, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Tidak ada data kunjungan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default DataKunjungan;
