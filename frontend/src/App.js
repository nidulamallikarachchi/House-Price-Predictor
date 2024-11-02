import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Predictor from './Components/Predictor';
import Visualization from "./Components/Visualization";
import OurData from './Components/OurData';
import AboutUs from './Components/AboutUs';
import News from './Components/News';
import RealEstateNews from "./Components/RealEstateNews";

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/visualizer" element={<Visualization />} />
          <Route path="/our-data" element={<OurData />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/news" element={<RealEstateNews/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
