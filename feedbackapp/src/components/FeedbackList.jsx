import { useMemo, useState } from 'react';
import '../styles/FeedbackList.css';

export const FeedbackList = ({ feedbackList, loading, error }) => {
  const [sortBy, setSortBy] = useState('recent');

  // useMemo to compute statistics and sorted list
  const { stats, sortedFeedback } = useMemo(() => {
    const stats = {
      total: feedbackList.length,
      averageRating: feedbackList.length > 0
        ? (feedbackList.reduce((sum, item) => sum + item.rating, 0) / feedbackList.length).toFixed(1)
        : 0,
      ratingBreakdown: {
        5: feedbackList.filter(f => f.rating === 5).length,
        4: feedbackList.filter(f => f.rating === 4).length,
        3: feedbackList.filter(f => f.rating === 3).length,
        2: feedbackList.filter(f => f.rating === 2).length,
        1: feedbackList.filter(f => f.rating === 1).length,
      },
    };

    let sorted = [...feedbackList];
    if (sortBy === 'rating-high') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'rating-low') {
      sorted.sort((a, b) => a.rating - b.rating);
    } else {
      // recent (default)
      sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    return { stats, sortedFeedback: sorted };
  }, [feedbackList, sortBy]);

  const getRatingColor = (rating) => {
    if (rating >= 4) return '#4CAF50';
    if (rating >= 3) return '#FFC107';
    return '#FF5252';
  };

  const getRatingLabel = (rating) => {
    const labels = {
      5: 'Excellent',
      4: 'Good',
      3: 'Average',
      2: 'Fair',
      1: 'Poor',
    };
    return labels[rating] || '';
  };

  if (loading) {
    return (
      <div className="feedback-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (error && feedbackList.length === 0) {
    return (
      <div className="feedback-list-container">
        <div className="error-state">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-list-container">
      <h2>📊 Feedback Summary</h2>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-label">Total Feedback</div>
          <div className="stat-value">{stats.total}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Rating</div>
          <div className="stat-value" style={{ color: getRatingColor(stats.averageRating) }}>
            {stats.averageRating} / 5 ⭐
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      {stats.total > 0 && (
        <div className="rating-breakdown">
          <h3>Rating Distribution</h3>
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="breakdown-row">
              <span className="rating-label">
                {'⭐'.repeat(rating)} {rating} - {getRatingLabel(rating)}
              </span>
              <div className="breakdown-bar">
                <div
                  className="breakdown-fill"
                  style={{
                    width: `${(stats.ratingBreakdown[rating] / stats.total) * 100}%`,
                    backgroundColor: getRatingColor(rating),
                  }}
                ></div>
              </div>
              <span className="breakdown-count">{stats.ratingBreakdown[rating]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Sort Controls */}
      {stats.total > 0 && (
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
          </select>
        </div>
      )}

      {/* Feedback List */}
      <h2 className="feedback-heading">💬 All Feedback</h2>
      
      {stats.total === 0 ? (
        <div className="empty-state">
          <p>No feedback yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="feedback-items">
          {sortedFeedback.map((item) => (
            <div key={item.id} className="feedback-item">
              <div className="feedback-header">
                <div className="feedback-author">
                  <h4>{item.name}</h4>
                  <p className="feedback-email">{item.email}</p>
                </div>
                <div className="feedback-rating" style={{ color: getRatingColor(item.rating) }}>
                  {'⭐'.repeat(item.rating)} {item.rating}/5
                </div>
              </div>

              <p className="feedback-comments">{item.comments}</p>

              <p className="feedback-timestamp">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
