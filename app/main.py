from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model import predict_sentiment

app = FastAPI(title="Twitter Sentiment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class TweetRequest(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "Twitter Sentiment API is running"}


@app.post("/predict")
def predict(request: TweetRequest):
    sentiment, confidence = predict_sentiment(request.text)

    return {
        "sentiment": sentiment,
        "confidence": confidence
    }