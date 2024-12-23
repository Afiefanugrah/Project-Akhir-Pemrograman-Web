import React, { useState, useEffect } from "react"
import '../../../styles/Dashboards/DataAnggota.css'
import Swal from "sweetalert2";


const DataAnggota = () => {
  const [dataAnggota, setDataAnggota] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3200/api/pengunjung/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Lihat struktur data
        // Pastikan untuk mengakses data.data untuk mendapatkan array
        setDataAnggota(data.data || []); // Ambil data dari objek 'data'
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
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

    if (confirmResult.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3200/api/pengunjung/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Gagal menghapus data');
        }

        setDataAnggota(dataAnggota.filter(anggota => anggota.id !== id));
        Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
      } catch (err) {
        console.error('Error saat menghapus data:', err);
        Swal.fire("Error", "Gagal menghapus data.", "error");
      }
    }
  };

  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dataAnggota.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(dataAnggota.length / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="content_anggota">
      <h1>Data Anggota</h1>
      <button className="btn btn-primary mb-3">Tambah Anggota</button>
      <div className="mytable">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>NIM</th>
              <th>Nama Lengkap</th>
              <th>Jenis Kelamin</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((anggota, index) => (
              <tr key={anggota.id}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>{anggota.nim}</td>
                <td>{anggota.nama_lengkap}</td>
                <td>{anggota.jenis_kelamin}</td>
                <td>{anggota.email_umrah}</td>
                <td>
                  <button className="btn btn-warning btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(anggota.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Buttons */}
      <div className="pagination">
        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-number">{`Page ${currentPage} of ${totalPages}`}</span>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataAnggota;
