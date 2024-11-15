import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Dashboards from './components/Dashboards';

function App() {
  const [showFromPengunjung, setShowFromPengunjung] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home title="HOME PAGE" showFromPengunjung={showFromPengunjung} showRegistrasiPengunjung={false} />} />
        <Route path="/register" element={<Home title="register PAGE" sshowFromPengunjung={false} showRegistrasiPengunjung={true} />} />
        <Route path="/login" element={<Home title="Login PAGE" showFromPengunjung={false} showRegistrasiPengunjung={false} />} />
        <Route path="/dashboard/*" element={<Dashboards />} />
        {/* <Route path="/dashboard" element={<Dashboards title="Dashboard PAGE" />} /> */}
        {/* <Route path="/dataanggota" element={<Dashboards title="Dashboard PAGE" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
