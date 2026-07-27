import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TweetInput from "./components/TweetInput";
import PredictButton from "./components/PredictButton";
import Result from "./components/Result";
import History from "./components/History";
import Footer from "./components/Footer";

function App() {
  const [tweet, setTweet] = useState("");
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear button
  const handleClear = () => {
    setTweet("");
    setPrediction("");
    setConfidence(0);
    setError("");
  };

  // Predict sentiment
  const handlePredict = async () => {
    if (!tweet.trim()) {
      setError("Please enter a tweet.");
      return;
    }

    setError("");
    setPrediction("");
    setConfidence(0);
    setLoading(true);

    try {
      const response = await fetch(
        "https://twitter-sentiment-analysis-t9vn.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: tweet,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prediction.");
      }

      const data = await response.json();

      console.log(data);

      setPrediction(data.sentiment);
      setConfidence(data.confidence);

      setHistory((prev) => [
        {
          text: tweet,
          sentiment: data.sentiment,
          confidence: data.confidence,
        },
        ...prev.slice(0, 4),
      ]);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />

      <TweetInput
        tweet={tweet}
        setTweet={setTweet}
      />

      {error && <p className="error">{error}</p>}

      <div className="button-group">
        <PredictButton
          onPredict={handlePredict}
          loading={loading}
        />

        <button
          className="clear-btn"
          onClick={handleClear}
        >
          🗑 Clear
        </button>
      </div>

      <Result
        prediction={prediction}
        confidence={confidence}
      />

      <History history={history} />

      <Footer />
    </div>
  );
}

export default App;