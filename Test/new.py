import pandas as pd
import joblib

# Load the model and dataset directly
best_rf_regressor = joblib.load('Models/random_forest_model_for_house_price_prediction.joblib')
crime_data = pd.read_csv('Datasets/crimes_by_state.csv')

# List of available states in the model
available_states = [
    "New York", "Pennsylvania", "District of Columbia", "Maryland", "Virginia",
    "North Carolina", "Georgia", "Florida", "Tennessee", "Kentucky", "Ohio",
    "Indiana", "Michigan", "Wisconsin", "Minnesota", "Illinois", "Missouri",
    "Kansas", "Nebraska", "Louisiana", "Oklahoma", "Texas", "Colorado",
    "Arizona", "New Mexico", "Nevada", "California", "Oregon", "Washington"
]


# Define a function to predict for all available states based on the number of bedrooms and bathrooms
def predict_house_price_for_all_states(bedrooms, baths):
    predictions = []

    for state in available_states:
        # Retrieve crime statistics for the state
        crime_stats = crime_data.loc[crime_data['state'] == state]
        if crime_stats.empty:
            predictions.append({'state': state, 'error': "No data available for this state."})
            continue

        property_crime = crime_stats['property_per_100_000'].values[0]
        violence_crime = crime_stats['violence_per_100_000'].values[0]

        # Prepare input data
        input_data = pd.DataFrame({
            'beds': [bedrooms],
            'baths': [baths],
            'property_per_100_000': [property_crime],
            'violence_per_100_000': [violence_crime],
            'state': [state]
        })

        # Make prediction
        try:
            predicted_price = best_rf_regressor.predict(input_data)[0]
            predictions.append({'state': state, 'predicted_price': f"${predicted_price:,.2f}"})
        except Exception as e:
            predictions.append({'state': state, 'error': str(e)})

    return predictions


# Example usage: Input the number of bedrooms and bathrooms
if __name__ == "__main__":
    bedrooms = int(input("Enter the number of bedrooms: "))
    baths = int(input("Enter the number of bathrooms: "))

    all_state_predictions = predict_house_price_for_all_states(bedrooms, baths)

    print("\nPredictions for available states:")
    for prediction in all_state_predictions:
        state = prediction.get('state')
        price = prediction.get('predicted_price', prediction.get('error'))
        print(f"{state}: {price}")
