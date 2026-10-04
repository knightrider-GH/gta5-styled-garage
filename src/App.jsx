import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import Compare from './pages/Compare';
import PurchaseModal from './components/PurchaseModal';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleBuy = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home onBuy={handleBuy} />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
      <PurchaseModal show={showModal} onClose={closeModal} car={selectedCar} />
    </ThemeProvider>
  );
}

export default App;