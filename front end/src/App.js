import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/Home';

function App() {
  const showFromPengunjung = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home title="HOME PAGE" showFromPengunjung={showFromPengunjung} />} />
        <Route path="/register" element={<Home title="HOME PAGE" showFromPengunjung={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
