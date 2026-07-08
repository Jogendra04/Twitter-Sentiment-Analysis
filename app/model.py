import joblib

# Load trained pipeline
model = joblib.load("models/twitter_sentiment_pipeline.pkl")


def predict_sentiment(text: str):
    # Predict sentiment
    prediction = model.predict([text])[0]

    # Predict probabilities
    probabilities = model.predict_proba([text])[0]

    # Highest probability = confidence
    confidence = round(max(probabilities) * 100, 2)

    return prediction, confidence