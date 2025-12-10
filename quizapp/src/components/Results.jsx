import { useState } from 'react';
import '../styles/Results.css';

export const Results = ({ score, totalQuestions, onRestart, onSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return '🎉 Outstanding! Perfect or near-perfect score!';
    if (percentage >= 80) return '⭐ Excellent work!';
    if (percentage >= 70) return '👍 Good job!';
    if (percentage >= 50) return '📚 Keep practicing!';
    return '💪 Keep learning React!';
  };

  const handleSubmit = async () => {
    if (!studentName.trim()) {
      setSubmitError('Please enter your name');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const response = await fetch('http://localhost:4000/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: studentName,
          score: score,
          total: totalQuestions,
          percentage: percentage,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit results: ${response.status}`);
      }

      setSubmitted(true);
      if (onSubmit) {
        onSubmit();
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit results. Make sure json-server is running.');
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="results-container">
        <div className="results-card success-card">
          <h1>✅ Results Submitted!</h1>
          <p>Thank you, <strong>{studentName}</strong>!</p>
          <p>Your quiz results have been saved successfully.</p>
          <button className="restart-button" onClick={onRestart}>
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-card">
        <h1>Quiz Complete! 🎊</h1>

        <div className="score-display">
          <div className="score-circle">
            <span className="percentage">{percentage}%</span>
          </div>
          <p className="score-text">
            You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong>
          </p>
        </div>

        <p className="performance-message">{getPerformanceMessage()}</p>

        <div className="submission-form">
          <div className="form-group">
            <label htmlFor="studentName">Enter Your Name:</label>
            <input
              id="studentName"
              type="text"
              placeholder="Your name"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                setSubmitError(null);
              }}
              disabled={submitting}
            />
          </div>

          {submitError && <p className="error-message">{submitError}</p>}

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Results'}
          </button>

          <button className="restart-button" onClick={onRestart}>
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
