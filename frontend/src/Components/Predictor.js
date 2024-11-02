import React, { useState } from "react";
import axios from "axios";
import styles from "./Styles/Predictor.module.css";

const availableStates = [
  "New York", "Pennsylvania", "District of Columbia", "Maryland", "Virginia",
  "North Carolina", "Georgia", "Florida", "Tennessee", "Kentucky", "Ohio",
  "Indiana", "Michigan", "Wisconsin", "Minnesota", "Illinois", "Missouri",
  "Kansas", "Nebraska", "Louisiana", "Oklahoma", "Texas", "Colorado",
  "Arizona", "New Mexico", "Nevada", "California", "Oregon", "Washington"
];

function Predictor() {
  const [state, setState] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [baths, setBaths] = useState(1);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict_price/", {
        state: state,
        bedrooms: bedrooms,
        baths: baths
      });
      setPrediction(response.data.predicted_price);
    } catch (error) {
      setPrediction("Error: " + (error.response?.data?.detail || "An error occurred"));
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.App}>
        <h2>House Price Prediction</h2>
        <form onSubmit={handleSubmit}>
          <label>
            State:
            <select value={state} onChange={(e) => setState(e.target.value)} required>
              <option value="">Select a state</option>
              {availableStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

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

          <button type="submit">Predict Price</button>
        </form>
        {prediction && <h3>Predicted Price: ${prediction}</h3>}
      </div>
    </div>
  );
}

export default Predictor;
