function History({ history }) {

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history">

      <h2>Prediction History</h2>

      {history.map((item, index) => (

        <div className="history-card" key={index}>

          <p>
            {item.text}
          </p>

          <strong>
            {item.sentiment}
          </strong>

          <span>
            {item.confidence}%
          </span>

        </div>

      ))}

    </div>
  );
}

export default History;