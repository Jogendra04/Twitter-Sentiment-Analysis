function TweetInput({ tweet, setTweet }) {

  const maxLength = 280;

  return (
    <div>

      <textarea
        className="tweet-input"
        placeholder="Write your tweet here..."
        value={tweet}
        maxLength={maxLength}
        onChange={(e) => setTweet(e.target.value)}
      />

      <div className="character-count">
        {tweet.length}/{maxLength} characters
      </div>

    </div>
  );
}

export default TweetInput;