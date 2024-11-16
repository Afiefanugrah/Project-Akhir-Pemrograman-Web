import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../../../styles/Dashboards/Dashboard.css";

const Dashboard = () => {
  const [totalAnggota, setTotalAnggota] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data jumlah anggota dari API
    fetch("http://localhost:3200/api/pengunjung/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data anggota");
        }
        return response.json();
      })
      .then((data) => {
        // Ambil panjang array data pengunjung jika datanya berupa array
        if (Array.isArray(data.data)) {
          setTotalAnggota(data.data.length);
        } else {
          setTotalAnggota(0); // Default jika data tidak valid
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container fluid className="p-5">
      <h1 className="mb-4">Dashboard</h1>

      <Row className="mb-5">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h3>Total Anggota</h3>
              <h2>{totalAnggota}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h3>Pengunjung Bulanan</h3>
              <h2>100</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h3>Pengunjung Harian</h3>
              <h2>100</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h5>Visualisasi Data Pengunjung Setahun Terakhir</h5>
      {/* <div className="visualization-box mt-2"></div> */}
    </Container>
  );
};

export default Dashboard;
