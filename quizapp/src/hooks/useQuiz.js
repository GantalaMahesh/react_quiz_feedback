import { useState, useEffect } from 'react';

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    if (!quizStarted) return;

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching questions from http://localhost:4000/questions');
        const response = await fetch('http://localhost:4000/questions');
        
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Questions fetched:', data);
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch questions. Make sure json-server is running on port 4000.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setError(null);
  };

  const selectAnswer = (optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setError(null);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex] || null;
  };

  return {
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
    finishQuiz,
    restartQuiz,
    calculateScore,
    getCurrentQuestion,
  };
};
