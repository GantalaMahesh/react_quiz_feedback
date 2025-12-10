# React Training – Coding Assessment

This repository contains **two fully functional React applications** that demonstrate mastery of React Hooks, custom hooks, data fetching, and state management using Vite and JSON Server.

## 🎯 Project Overview

This assessment implements both required applications:

1. **📝 Timed Quiz Game** (`quizapp/`) - Interactive quiz with 30-second timer per question
2. **💌 Feedback Collection App** (`feedbackapp/`) - User feedback submission with statistics

Both projects follow the React Training assessment requirements and use modern React patterns with Hooks.

---

## 📋 Assessment Compliance Checklist

### ✅ React Hooks Required
- [x] **useState** - State management in components
- [x] **useEffect** - Side effects with proper cleanup
- [x] **Custom Hooks** - Logic reuse across components
- [x] **useMemo** - Performance optimization for derived values
- [x] **Data Fetching** - Fetch API with error handling
- [x] **Error & Loading States** - Graceful error handling

### ✅ Mock API Setup
- [x] **JSON Server** - Running on port 4000
- [x] **db.json** - Shared database with all required endpoints
- [x] **API Endpoints**:
  - `GET /questions` - Fetch quiz questions
  - `GET /feedback` - Fetch feedback entries
  - `POST /results` - Submit quiz results
  - `POST /feedback` - Submit feedback entries

---

## 📁 Repository Structure

```
React-Js/
├── quizapp/                 # Timed Quiz Game App
│   ├── src/
│   │   ├── components/
│   │   │   ├── StartScreen.jsx
│   │   │   ├── QuizQuestion.jsx
│   │   │   ├── Timer.jsx
│   │   │   └── Results.jsx
│   │   ├── hooks/
│   │   │   └── useQuiz.js           ⭐ Custom Hook
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── StartScreen.css
│   │   │   ├── Quiz.css
│   │   │   ├── Timer.css
│   │   │   ├── Results.css
│   │   │   └── index.css
│   │   ├── App.jsx                  ⭐ Uses useMemo
│   │   └── main.jsx
│   ├── db.json
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── feedbackapp/             # Feedback Collection App
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.jsx     ⭐ Uses useState
│   │   │   └── FeedbackList.jsx     ⭐ Uses useMemo
│   │   ├── hooks/
│   │   │   └── useFeedback.js       ⭐ Custom Hook
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── FeedbackForm.css
│   │   │   ├── FeedbackList.css
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── db.json
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md                # This file
```

---

## 🚀 Quick Start (Both Apps)

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup Instructions

#### 1️⃣ Install JSON Server (Global)
```bash
npm install -g json-server
```

#### 2️⃣ Start JSON Server (in Terminal 1)
```bash
json-server --watch db.json --port 4000
```

You should see:
```
  Loading db.json
  Done

  Resources
  http://localhost:4000/questions
  http://localhost:4000/results
  http://localhost:4000/feedback
```

#### 3️⃣ Run Quiz App (in Terminal 2)
```bash
cd quizapp
npm install
npm run dev
```
Visit: `http://localhost:5173`

#### 4️⃣ Run Feedback App (in Terminal 3 - Optional)
```bash
cd feedbackapp
npm install
npm run dev
```
Visit: `http://localhost:5174`

---

## 🎓 Project 1: Timed Quiz Game (`quizapp/`)

### Features
✅ Fetch 10 React Hooks questions from API
✅ Display one question at a time
✅ 30-second timer per question (auto-advance on timeout)
✅ Multiple-choice options (A, B, C, D)
✅ Score calculation and percentage display
✅ Submit results to `/results` endpoint
✅ Restart functionality
✅ Error handling with user-friendly messages

### React Concepts Implemented

#### 1. **useState** - Quiz State Management
```javascript
const [questions, setQuestions] = useState([]);           // Question data
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedAnswers, setSelectedAnswers] = useState([]);
const [quizStarted, setQuizStarted] = useState(false);
const [quizFinished, setQuizFinished] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

#### 2. **useEffect** - Data Fetching with Cleanup
```javascript
useEffect(() => {
  if (!quizStarted) return;
  
  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:4000/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    }
  };
  
  fetchQuestions();
}, [quizStarted]);
```

#### 3. **Custom Hook - useQuiz** (`src/hooks/useQuiz.js`)
- Encapsulates all quiz logic
- Methods: `startQuiz()`, `selectAnswer()`, `goToNextQuestion()`, `finishQuiz()`, `calculateScore()`
- Returns: questions, loading, error, scores, navigation methods

#### 4. **useMemo** - Computed Quiz Statistics (App.jsx)
```javascript
const quizStats = useMemo(() => {
  return {
    score: calculateScore(),
    total: questions.length,
    percentage: questions.length > 0 
      ? Math.round((calculateScore() / questions.length) * 100) 
      : 0,
  };
}, [calculateScore, selectedAnswers, questions]);
```

#### 5. **Timer Component** - useEffect with Cleanup
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        onTimeUp();
        return duration;
      }
      return prev - 1;
    });
  }, 1000);
  
  return () => clearInterval(interval);  // Cleanup
}, [duration, onTimeUp]);
```

#### 6. **Error Handling**
- API connection failures show user-friendly error message
- Loading state shows spinner while fetching
- Graceful fallback to start screen

### Result Submission Payload
```json
{
  "name": "Student Name",
  "score": 7,
  "total": 10,
  "percentage": 70,
  "timestamp": "2024-12-10T10:30:00.000Z"
}
```

---

## 🎓 Project 2: Feedback Collection App (`feedbackapp/`)

### Features
✅ Form with 4 fields: Name, Email, Rating (1-5), Comments
✅ Form validation (required fields, email format)
✅ POST feedback to `/feedback` endpoint
✅ Fetch and display all feedback entries
✅ Sorting: Most Recent, Highest Rating, Lowest Rating
✅ Statistics: Total count, average rating, rating breakdown
✅ Success/error message display
✅ Responsive design (mobile & desktop)

### React Concepts Implemented

#### 1. **useState** - Component State
```javascript
// FeedbackForm.jsx - Controlled Components
const [formData, setFormData] = useState({
  name: '',
  email: '',
  rating: '5',
  comments: ''
});

// FeedbackList.jsx - UI State
const [sortBy, setSortBy] = useState('recent');
```

#### 2. **useEffect** - Fetch on Mount
```javascript
// useFeedback.js
useEffect(() => {
  fetchFeedback();
}, []);  // Runs once on mount

const fetchFeedback = async () => {
  try {
    const response = await fetch('http://localhost:4000/feedback');
    const data = await response.json();
    setFeedbackList(data);
  } catch (err) {
    setError(err.message);
  }
};
```

#### 3. **Custom Hook - useFeedback** (`src/hooks/useFeedback.js`)
- Methods: `fetchFeedback()`, `submitFeedback(formData)`
- Returns: feedbackList, loading, error, submitting state
- Handles: GET requests, POST requests, error handling
- Auto-fetches on component mount

#### 4. **useMemo** - Statistics Computation (FeedbackList.jsx)
```javascript
const { stats, sortedFeedback } = useMemo(() => {
  // Calculate statistics
  const total = feedbackList.length;
  const averageRating = feedbackList.length > 0
    ? (sum / feedbackList.length).toFixed(1)
    : 0;
  
  // Rating breakdown
  const ratingBreakdown = {
    5: count5Stars,
    4: count4Stars,
    3: count3Stars,
    2: count2Stars,
    1: count1Star
  };
  
  // Sort feedback
  let sorted = [...feedbackList];
  if (sortBy === 'rating-high') sorted.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'rating-low') sorted.sort((a, b) => a.rating - b.rating);
  if (sortBy === 'recent') sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return { stats: { total, averageRating, ratingBreakdown }, sortedFeedback: sorted };
}, [feedbackList, sortBy]);
```

#### 5. **Controlled Components** - Form Handling
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isValidForm()) {
    await submitFeedback(formData);
  }
};
```

#### 6. **Error Handling**
- Form validation with helpful error messages
- API error handling with user feedback
- Loading states during fetch and submit
- Success message after submission

### Feedback Submission Payload
```json
{
  "name": "Student Name",
  "email": "email@example.com",
  "rating": 4,
  "comments": "Very informative session."
}
```

---

## 📊 API Endpoints (JSON Server on Port 4000)

### Questions Endpoint
```
GET /questions
```
Returns array of 10 React Hooks questions with options and correct answers.

### Results Endpoint
```
POST /results
GET  /results
```
Submit quiz results and retrieve all submitted results.

### Feedback Endpoint
```
GET  /feedback
POST /feedback
```
Retrieve all feedback and submit new feedback entries.

### Database Schema (db.json)
```json
{
  "questions": [...10 React Hooks questions...],
  "results": [...submitted quiz results...],
  "feedback": [...submitted feedback entries...]
}
```

---

## 🧪 Testing the Applications

### Quiz App Testing
1. ✅ Click "Start Quiz"
2. ✅ Answer a question and click "Next"
3. ✅ Watch the 30-second timer
4. ✅ Wait for auto-advance when timer ends
5. ✅ Check score after final question
6. ✅ Enter name and submit results
7. ✅ Click "Take Another Quiz" to restart
8. ✅ Stop JSON Server to test error handling

### Feedback App Testing
1. ✅ Fill out form with valid data
2. ✅ Submit feedback and check success message
3. ✅ Verify new entry appears in list
4. ✅ Test sorting options
5. ✅ Verify statistics update
6. ✅ Try invalid email to test validation
7. ✅ Leave fields empty to test required validation
8. ✅ Check responsive design on mobile

---

## 🔧 Troubleshooting

### "Failed to fetch questions/feedback" Error
- Ensure JSON Server is running: `json-server --watch db.json --port 4000`
- Verify `db.json` exists in the project root
- Check browser console for detailed error messages

### Port Already in Use
- Quiz App: Edit `vite.config.js` to change port
- Feedback App: Use different terminal or change port
- JSON Server: Use `json-server --watch db.json --port 5000` to use different port

### Timer Not Working
- Verify `Timer.jsx` is using `useEffect` with proper cleanup
- Check browser DevTools console for errors
- Ensure component is properly mounted

### Statistics Not Updating
- Check that `useMemo` dependencies include `feedbackList` and `sortBy`
- Verify API is returning complete feedback objects
- Clear browser cache if needed

---

## 📖 Key Learning Outcomes

### React Hooks Mastery
- ✅ `useState` for component state management
- ✅ `useEffect` for side effects with cleanup functions
- ✅ `useMemo` for performance optimization
- ✅ Custom Hooks for logic reuse

### Data Fetching Patterns
- ✅ Fetch API with async/await
- ✅ Error handling and retry logic
- ✅ Loading states and spinners
- ✅ POST requests with JSON payloads

### Component Architecture
- ✅ Controlled components
- ✅ Component composition
- ✅ Prop drilling
- ✅ Separation of concerns

### State Management
- ✅ Form state with controlled components
- ✅ UI state (loading, error, success)
- ✅ Data state from API responses
- ✅ Derived state with useMemo

---

## 📦 Dependencies

Both projects use:
- **react** (^19.2.0) - UI library
- **react-dom** (^19.2.0) - React DOM rendering
- **vite** (^7.2.4) - Build tool
- **json-server** - Mock REST API

No external UI libraries - all styling done with pure CSS3.

---

## 📝 Individual Project Documentation

For detailed information, see:
- **Quiz App**: `quizapp/README.md`
- **Feedback App**: `feedbackapp/README.md`

---

## ✨ Summary

This assessment demonstrates:

| Requirement | Quiz App | Feedback App |
|------------|----------|--------------|
| **useState** | ✅ Yes | ✅ Yes |
| **useEffect** | ✅ Yes (with cleanup) | ✅ Yes (with cleanup) |
| **Custom Hook** | ✅ useQuiz | ✅ useFeedback |
| **useMemo** | ✅ Quiz stats | ✅ Feedback stats & sorting |
| **Data Fetching** | ✅ GET /questions | ✅ GET/POST /feedback |
| **Error Handling** | ✅ Yes | ✅ Yes |
| **Loading States** | ✅ Yes | ✅ Yes |
| **Responsive Design** | ✅ Yes | ✅ Yes |
| **API Integration** | ✅ POST /results | ✅ POST /feedback |

---

## 🎉 Ready for Submission

Both applications are fully functional and production-ready. All React Hooks concepts are properly implemented and documented.

**To run both applications:**
1. Start JSON Server on port 4000
2. Run `npm run dev` in quizapp/
3. Run `npm run dev` in feedbackapp/ (different port)

Happy coding! 🚀

---

*React Training Assessment - Submitted on: December 10, 2025*
