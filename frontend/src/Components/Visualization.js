import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import usaStates from './usa_states.json';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Visualization() {
  const [bedrooms, setBedrooms] = useState(1);
  const [baths, setBaths] = useState(1);
  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState(null);
  const [choroplethData, setChoroplethData] = useState([]);

  const fetchPredictions = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict_price_for_all_states/", {
        bedrooms: bedrooms,
        baths: baths
      });
      const data = response.data;

      // Prepare data for Chart.js
      const labels = data.map(item => item.state);
      const prices = data.map(item => parseFloat(item.predicted_price.replace(/[$,]/g, "")));

      // Set up data for choropleth map
      setChoroplethData(
        data.reduce((acc, item) => {
          acc[item.state] = parseFloat(item.predicted_price.replace(/[$,]/g, ""));
          return acc;
        }, {})
      );

      // Ensure re-render cleanup by setting to null before setting new data
      setChartData(null);
      setTimeout(() => {
        setChartData({
          labels: labels,
          datasets: [
            {
              label: `Predicted Prices for ${bedrooms} Beds and ${baths} Baths`,
              data: prices,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.4)",
            },
          ],
        });
      }, 0);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const handlePredictClick = (e) => {
    e.preventDefault();
    fetchPredictions();
  };

  // Function to set choropleth color based on price
  const getChoroplethColor = (price) => {
    return price > 500000 ? '#800026' :
           price > 300000 ? '#BD0026' :
           price > 200000 ? '#E31A1C' :
           price > 100000 ? '#FC4E2A' :
           price > 50000  ? '#FD8D3C' :
           price > 20000  ? '#FEB24C' :
                            '#FFEDA0';
  };

  // Style for each state based on its predicted price
  const style = (feature) => {
    const stateName = feature.properties.name;
    const price = choroplethData[stateName];
    return {
      fillColor: getChoroplethColor(price || 0),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  return (
    <div className="Visualization">
      <h2>House Price Predictions Visualization</h2>

      <form onSubmit={handlePredictClick}>
        <label>
          Bedrooms:
          <select value={bedrooms} onChange={(e) => setBedrooms(parseInt(e.target.value))} required>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Bathrooms:
          <select value={baths} onChange={(e) => setBaths(parseInt(e.target.value))} required>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Select Visualization Type:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)} required>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="choropleth">Choropleth Map</option>
          </select>
        </label>

        <button type="submit">Predict and Visualize</button>
      </form>

      {chartData && (
        <div className="chart-container">
          {chartType === "line" && <Line data={chartData} />}
          {chartType === "bar" && <Bar data={chartData} />}
        </div>
      )}

      {chartType === "choropleth" && choroplethData && (
        <MapContainer style={{ height: "500px", width: "100%" }} center={[37.8, -96]} zoom={4}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON data={usaStates} style={style} />
        </MapContainer>
      )}
    </div>
  );
}

export default Visualization;
