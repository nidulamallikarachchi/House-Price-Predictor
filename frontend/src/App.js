import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Predictor from './Components/Predictor';
import Visualization from './Components/Visualization';
import OurData from './Components/OurData';
import AboutUs from './Components/AboutUs';
import RealEstateNews from './Components/RealEstateNews';
import './App.css'; // Import your CSS file

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: '2rem' }}>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false); // Hide the current page
    const timer = setTimeout(() => setIsVisible(true), 300); // Duration of fade-out
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className={`page ${isVisible ? 'fade-in' : 'fade-out'}`}>
      <Routes location={location}>
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/visualizer" element={<Visualization />} />
        <Route path="/our-data" element={<OurData />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news" element={<RealEstateNews />} />
      </Routes>
    </div>
  );
};

export default App;
