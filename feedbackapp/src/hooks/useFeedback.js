import { useState, useEffect } from 'react';

export const useFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all feedback
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching feedback from http://localhost:4000/feedback');
      const response = await fetch('http://localhost:4000/feedback');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch feedback: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Feedback fetched:', data);
      setFeedbackList(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch feedback. Make sure json-server is running on port 4000.');
      setLoading(false);
    }
  };

  const submitFeedback = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);
      console.log('Submitting feedback:', formData);

      const response = await fetch('http://localhost:4000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          rating: parseInt(formData.rating),
          comments: formData.comments,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit feedback: ${response.status}`);
      }

      const newFeedback = await response.json();
      console.log('Feedback submitted:', newFeedback);
      
      // Add to list immediately
      setFeedbackList([newFeedback, ...feedbackList]);
      setSubmitting(false);
      
      return newFeedback;
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message || 'Failed to submit feedback.');
      setSubmitting(false);
      throw err;
    }
  };

  return {
    feedbackList,
    loading,
    error,
    submitting,
    submitFeedback,
    fetchFeedback,
  };
};
