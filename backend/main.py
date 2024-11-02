from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import pandas as pd
import joblib

# Initialize FastAPI app
app = FastAPI()

# Constants and configuration
AVAILABLE_STATES = [
    "New York", "Pennsylvania", "District of Columbia", "Maryland", "Virginia",
    "North Carolina", "Georgia", "Florida", "Tennessee", "Kentucky", "Ohio",
    "Indiana", "Michigan", "Wisconsin", "Minnesota", "Illinois", "Missouri",
    "Kansas", "Nebraska", "Louisiana", "Oklahoma", "Texas", "Colorado",
    "Arizona", "New Mexico", "Nevada", "California", "Oregon", "Washington"
]
MODEL_PATH = 'Models/random_forest_model_for_house_price_prediction.joblib'
DATA_PATH = 'Datasets/crimes_by_state.csv'

# Load model and data
best_rf_regressor = joblib.load(MODEL_PATH)
crime_data = pd.read_csv(DATA_PATH)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for the frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for single state prediction
class PredictionRequest(BaseModel):
    state: str
    bedrooms: int
    baths: int

# Request model for all states prediction
class PredictionRequestAllStates(BaseModel):
    bedrooms: int
    baths: int

# Helper function to retrieve crime data for a given state
def get_crime_data(state: str) -> Dict[str, float]:
    crime_stats = crime_data.loc[crime_data['state'] == state]
    if crime_stats.empty:
        raise ValueError("State not found in dataset.")
    return {
        "property_per_100_000": crime_stats['property_per_100_000'].values[0],
        "violence_per_100_000": crime_stats['violence_per_100_000'].values[0]
    }

# Endpoint to predict house price for a specific state
@app.post("/predict_price/")
async def predict_price(request: PredictionRequest):
    try:
        crime_stats = get_crime_data(request.state)
        input_data = pd.DataFrame({
            'beds': [request.bedrooms],
            'baths': [request.baths],
            'property_per_100_000': [crime_stats["property_per_100_000"]],
            'violence_per_100_000': [crime_stats["violence_per_100_000"]],
            'state': [request.state]
        })
        predicted_price = best_rf_regressor.predict(input_data)[0]
        return {"predicted_price": round(predicted_price, 2)}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in prediction: {e}")

# Endpoint to predict house prices for all available states
@app.post("/predict_price_for_all_states/")
async def predict_price_for_all_states(request: PredictionRequestAllStates) -> List[Dict]:
    predictions = []
    for state in AVAILABLE_STATES:
        try:
            crime_stats = get_crime_data(state)
            input_data = pd.DataFrame({
                'beds': [request.bedrooms],
                'baths': [request.baths],
                'property_per_100_000': [crime_stats["property_per_100_000"]],
                'violence_per_100_000': [crime_stats["violence_per_100_000"]],
                'state': [state]
            })
            predicted_price = best_rf_regressor.predict(input_data)[0]
            predictions.append({'state': state, 'predicted_price': f"${predicted_price:,.2f}"})
        except ValueError:
            predictions.append({'state': state, 'error': "No data available for this state."})
        except Exception as e:
            predictions.append({'state': state, 'error': str(e)})
    return predictions