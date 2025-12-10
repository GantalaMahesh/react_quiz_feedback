import { useFeedback } from './hooks/useFeedback';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackList } from './components/FeedbackList';
import './styles/App.css';

function App() {
  const { feedbackList, loading, error, submitting, submitFeedback } = useFeedback();

  const handleSubmitFeedback = async (formData) => {
    await submitFeedback(formData);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>💌 Feedback Portal</h1>
        <p>Share your thoughts and help us improve</p>
      </header>

      <div className="app-content">
        <div className="form-section">
          <FeedbackForm
            onSubmit={handleSubmitFeedback}
            submitting={submitting}
            error={error}
          />
        </div>

        <div className="list-section">
          <FeedbackList
            feedbackList={feedbackList}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
