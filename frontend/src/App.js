import React from 'react';
import PredictionForm from './Components/PredictionForm';
import Visualization from "./Components/Visualization";

function App() {
    return (
        <div className="App">
            <h1>House Price Predictor</h1>
            <PredictionForm />
            <Visualization/>
        </div>
    );
}

export default App;
