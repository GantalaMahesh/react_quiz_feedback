import '../styles/StartScreen.css';

export const StartScreen = ({ onStart, loading, error }) => {
  return (
    <div className="start-screen">
      <div className="start-card">
        <h1>⚛️ React Hooks Quiz Game</h1>
        <p className="subtitle">Test your knowledge of React Hooks</p>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">⏱️</span>
            <span>30 seconds per question</span>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button
          className="start-button"
          onClick={onStart}
          disabled={loading || !!error}
        >
          {loading ? 'Loading...' : error ? 'Failed to Load' : 'Start Quiz'}
        </button>

        <p className="instructions">
          Answer each question before time runs out. Select your answer and click Next.
        </p>
      </div>
    </div>
  );
};
