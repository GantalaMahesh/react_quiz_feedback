import { useState } from 'react';
import '../styles/FeedbackForm.css';

export const FeedbackForm = ({ onSubmit, submitting, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    comments: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.comments.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    try {
      await onSubmit(formData);
      setSuccessMessage('✅ Thank you! Your feedback has been submitted successfully.');
      setFormData({
        name: '',
        email: '',
        rating: '5',
        comments: '',
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="feedback-form-container">
      <div className="form-card">
        <h2>📝 Submit Your Feedback</h2>
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {error && (
          <div className="error-message">⚠️ {error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={submitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              disabled={submitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (1-5) *</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              <option value="4">⭐⭐⭐⭐ 4 - Good</option>
              <option value="3">⭐⭐⭐ 3 - Average</option>
              <option value="2">⭐⭐ 2 - Fair</option>
              <option value="1">⭐ 1 - Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments *</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Share your thoughts and feedback..."
              rows="5"
              disabled={submitting}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? '⏳ Submitting...' : '📤 Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};
