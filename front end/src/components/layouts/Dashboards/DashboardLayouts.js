import React from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import "../../../styles/Dashboards/Dashboard.css"


const Dashboard = () => {
  return (
    <Container fluid className="p-5">
      <h1 className="mb-4">Dashboard</h1>

      <Row className="mb-5">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h3>Total Anggota</h3>
              <h2>100</h2>
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
  )
}

export default Dashboard