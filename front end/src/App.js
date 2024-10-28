import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home title="HOME PAGE"/>} />
      </Routes>
    </Router>
  );
}

export default App;
