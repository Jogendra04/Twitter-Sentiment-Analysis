function Result({ prediction, confidence }) {
  if (!prediction) {
    return null;
  }

  let emoji = "";
  let color = "";
  let barColor = "";
  let backgroundColor = "";

  switch (prediction.toLowerCase()) {
    case "positive":
      emoji = "🟢";
      color = "#16a34a";
      barColor = "#22c55e";
      backgroundColor = "#f0fdf4";
      break;

    case "neutral":
      emoji = "🟡";
      color = "#ca8a04";
      barColor = "#facc15";
      backgroundColor = "#fefce8";
      break;

    case "negative":
      emoji = "🔴";
      color = "#dc2626";
      barColor = "#ef4444";
      backgroundColor = "#fef2f2";
      break;

    default:
      emoji = "⚪";
      color = "#64748b";
      barColor = "#94a3b8";
      backgroundColor = "#f8fafc";
  }

  return (
    <div
      className="result"
      style={{
        backgroundColor: backgroundColor,
      }}
    >

      <h2>Prediction</h2>

      <p style={{ color }}>
        {emoji} {prediction}
      </p>


      <div className="confidence">

        <h3>Model Confidence</h3>

        <div className="progress">
          <div
            className="progress-fill"
            style={{
              width: `${confidence}%`,
              backgroundColor: barColor,
            }}
          />
        </div>

        <span>
          Confidence: {Number(confidence).toFixed(2)}%
        </span>

      </div>

    </div>
  );
}

export default Result;