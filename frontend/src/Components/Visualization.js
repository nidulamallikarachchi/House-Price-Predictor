import React, { useState } from "react";
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
          Select Chart Type:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)} required>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
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
    </div>
  );
}

export default Visualization;
