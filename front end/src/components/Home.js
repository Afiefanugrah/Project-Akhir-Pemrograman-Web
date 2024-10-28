import { Container } from "react-bootstrap"
import RegistrasiPengunjung from "./layouts/registrasiPengunjung"
import "../styles/HomePage.css"


const Home = () => {
  return(
    // <Container className="by-conatiner">
      <main className="by-conatiner">
        <div className="by-session1 container">
          <div className="row">
            <div className="by-col p-4 border rounded shadow-sm">
              <RegistrasiPengunjung />
            </div>
          </div>
        </div>
      </main>
    // </Container>
  )
}

export default Home