import React from "react";
import { Container } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react"; 
import "../styles/HomePage.css"
import NavbarLogin from "./layouts/NavbarLogin";
import FromPengunjung from "./layouts/fromPengunjung";
import RegistrasiPengunjung from "./layouts/registrasiPengunjung";
import LoginAdmin from "./layouts/loginAdmin";

const Home = ({ showFromPengunjung, showRegistrasiPengunjung }) => { // Menerima showFrom sebagai props
  return (
    <Container fluid className="p-0 bg-my">
        <NavbarLogin className="navbar" style={{ display: 'block' }} />
      <main className="h-100">
        <div className="container text-center my-container">
          <div className="row align-items-center h-100 w-100">
            <div className="col-12 col-md-6 my-col-6">
              <div className="my-left-content">
                {showFromPengunjung ? (
                  <FromPengunjung />
                ) : showRegistrasiPengunjung ? (
                  <RegistrasiPengunjung />
                ) : (
                  <LoginAdmin />
                )}
              </div>
            </div>
            <div className="col-6 my-col-6 my-right">
              <div className="my-right-content">
                <h3>Scan QR di bawah 👇</h3>
                <QRCodeCanvas value="http://localhost:3200/" size={250} level="M" />
                {/* <QRCodeCanvas value="http://192.168.1.7:3000/" size={225} level="H" /> */}
                <h5>Atau ketik link berikut <br /><a href="http://localhost:3200/">http://localhost:3200/</a></h5>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;
