function PredictButton({ onPredict, loading }) {
  return (
    <button
      className="predict-btn"
      onClick={onPredict}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Analyzing...
        </>
      ) : (
        "🚀 Predict"
      )}
    </button>
  );
}

export default PredictButton;