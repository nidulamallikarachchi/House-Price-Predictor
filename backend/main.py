from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

# Allow CORS for localhost:3000 (React app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and data
model_path = 'Models/random_forest_model_for_house_price_prediction.joblib'
data_path = 'Datasets/crimes_by_state.csv'
best_rf_regressor = joblib.load(model_path)
crime_data = pd.read_csv(data_path)

# Define Pydantic model for request data
class PredictionRequest(BaseModel):
    state: str
    bedrooms: int
    baths: int

@app.post("/predict_price/")
async def predict_price(request: PredictionRequest):
    # Retrieve crime data for the specified state
    crime_stats = crime_data.loc[crime_data['state'] == request.state]
    if crime_stats.empty:
        raise HTTPException(status_code=404, detail="State not found in dataset.")

    # Extract crime rates
    property_crime = crime_stats['property_per_100_000'].values[0]
    violence_crime = crime_stats['violence_per_100_000'].values[0]

    # Prepare input for prediction
    input_data = pd.DataFrame({
        'beds': [request.bedrooms],
        'baths': [request.baths],
        'property_per_100_000': [property_crime],
        'violence_per_100_000': [violence_crime],
        'state': [request.state]
    })

    # Make prediction
    try:
        predicted_price = best_rf_regressor.predict(input_data)[0]
        return {"predicted_price": round(predicted_price, 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in prediction: {e}")
