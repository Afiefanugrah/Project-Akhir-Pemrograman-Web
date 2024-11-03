import React from "react";
import { Container } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react"; 
import "../styles/HomePage.css"
import "../styles/RegisterPage.css";
import NavbarLogin from "./layouts/NavbarLogin";
import FromPengunjung from "./layouts/fromPengunjung";
import RegistrasiPengunjung from "./layouts/registrasiPengunjung";

const Home = ({ showFromPengunjung }) => { // Menerima showFrom sebagai props
  return (
    <Container fluid className="p-0 bg-my">
      <main className="h-100">
        <NavbarLogin className="navbar" style={{ display: 'block' }} />
        <div className="container text-center my-container">
          <div className="row align-items-center h-100 w-100 border">
            <div className="col-12 col-md-6 my-col-6">
              <div className="my-left-content">
              {showFromPengunjung ? <FromPengunjung /> : <RegistrasiPengunjung /> }
              </div>
            </div>
            <div className="col-6 my-col-6 my-right">
              <div className="my-right-content">
                <h3>Scan QR di bawah 👇</h3>
                <QRCodeCanvas value="http://192.168.1.7:3000/" size={225} level="H" />
                <h5>Atau ketik link berikut <br /><a href="http://192.168.1.7:3000/">http://192.168.56.1:3000/</a></h5>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;
