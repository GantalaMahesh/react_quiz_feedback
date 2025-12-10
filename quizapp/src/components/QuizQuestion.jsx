import { Timer } from './Timer';
import '../styles/Quiz.css';

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onTimeUp,
  onNext,
}) => {
  if (!question) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>React Hooks Quiz</h1>
        <div className="progress-info">
          <span>Question {questionNumber + 1} of {totalQuestions}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((questionNumber + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>

      <div className="quiz-content">
        <Timer key={questionNumber} duration={30} onTimeUp={onTimeUp} isActive={true} />

        <div className="question-box">
          <h2 className="question-text">{question.question}</h2>
        </div>

        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index ? 'selected' : ''
              }`}
              onClick={() => onSelectAnswer(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        <button className="next-button" onClick={onNext}>
          {questionNumber + 1 === totalQuestions ? 'Finish' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};
