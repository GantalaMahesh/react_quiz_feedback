import { useMemo } from 'react';
import { useQuiz } from './hooks/useQuiz';
import { StartScreen } from './components/StartScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { Results } from './components/Results';
import './styles/App.css';

function App() {
  const {
    questions,
    loading,
    error,
    currentQuestionIndex,
    selectedAnswers,
    quizStarted,
    quizFinished,
    startQuiz,
    selectAnswer,
    goToNextQuestion,
    restartQuiz,
    calculateScore,
    getCurrentQuestion,
  } = useQuiz();

  // useMemo to compute quiz statistics
  const quizStats = useMemo(() => {
    return {
      score: calculateScore(),
      answered: selectedAnswers.length,
      total: questions.length,
      percentage: questions.length > 0 ? Math.round((calculateScore() / questions.length) * 100) : 0,
    };
  }, [calculateScore, selectedAnswers, questions]);

  const handleTimeUp = () => {
    goToNextQuestion();
  };

  if (!quizStarted) {
    return <StartScreen onStart={startQuiz} loading={loading} error={error} />;
  }

  if (quizFinished) {
    return (
      <Results
        score={quizStats.score}
        totalQuestions={quizStats.total}
        onRestart={restartQuiz}
      />
    );
  }

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="app">
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading quiz questions...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <h2>⚠️ Error Loading Quiz</h2>
          <p>{error}</p>
          <button onClick={restartQuiz}>Back to Home</button>
        </div>
      ) : (
        <QuizQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onSelectAnswer={selectAnswer}
          onTimeUp={handleTimeUp}
          onNext={goToNextQuestion}
        />
      )}
    </div>
  );
}

export default App;
