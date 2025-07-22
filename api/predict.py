import sys
import json
import joblib
import pandas as pd

# Load model
model = joblib.load("model.pkl")

# Define the correct feature order
feature_order = ["area", "bedrooms", "bathrooms", "stories", "mainroad",
                 "guestroom", "basement", "hotwaterheating", "airconditioning",
                 "parking", "prefarea", "furnishingstatus"]

# Get input JSON from Node.js as a string argument
input_json = sys.argv[1]
input_dict = json.loads(input_json)

# Convert to DataFrame with correct column order
input_df = pd.DataFrame([input_dict])[feature_order]

# Predict
prediction = model.predict(input_df)

# Output the result as JSON
print(json.dumps({"prediction": prediction[0]}))
