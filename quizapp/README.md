# React Timed Quiz Game - Vite App

A fully functional timed quiz game built with React, Vite, and React Hooks. Features real-time API integration, custom hooks, and a beautiful modern UI.

## 📋 Project Overview

This is a **Timed Quiz Game** where users answer multiple-choice questions about React Hooks under a time limit. Each question has a 30-second timer that automatically moves to the next question when time runs out.

### ✨ Key Features

- **Real-time Quiz Gameplay**: Answer questions with visual feedback
- **Auto-advance Timer**: 30-second countdown per question
- **Score Tracking**: Automatic score calculation with percentage display
- **Result Submission**: Save your quiz results to a backend database
- **Error Handling**: Graceful error messages when the API is unavailable
- **Loading States**: Professional loading UI
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Restart Functionality**: Take multiple quizzes without refreshing

## 🚀 Tech Stack

- **React 18** - UI library with Hooks
- **Vite** - Fast build tool and dev server
- **JSON Server** - Mock REST API
- **CSS3** - Modern styling with gradients and animations

## 📦 React Hooks Used

1. **useState** - Manages quiz state (questions, current question, selected answers, timer, etc.)
2. **useEffect** - Handles data fetching and timer logic with proper cleanup
3. **useMemo** - Computes quiz statistics and percentage (derived values)
4. **Custom Hook (useQuiz)** - Encapsulates all quiz logic and state management

## 🛠️ Project Structure

```
quizapp/
├── src/
│   ├── components/
│   │   ├── StartScreen.jsx      # Welcome screen with quiz info
│   │   ├── QuizQuestion.jsx     # Question display & options
│   │   ├── Timer.jsx            # Countdown timer component
│   │   └── Results.jsx          # Final score & result submission
│   ├── hooks/
│   │   └── useQuiz.js           # Custom hook for quiz logic
│   ├── styles/
│   │   ├── App.css              # Main app styling
│   │   ├── StartScreen.css      # Start screen styles
│   │   ├── Quiz.css             # Quiz question styles
│   │   ├── Timer.css            # Timer styles
│   │   └── Results.css          # Results screen styles
│   ├── App.jsx                  # Main component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── db.json                       # Mock database for json-server
├── package.json
└── vite.config.js
```

## 📥 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Step 1: Install Dependencies

```bash
cd quizapp
npm install
```

### Step 2: Install JSON Server (Global)

```bash
npm install -g json-server
```

### Step 3: Start the Mock API (in a separate terminal)

```bash
json-server --watch db.json --port 4000
```

You should see output like:
```
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:4000/questions
  http://localhost:4000/results
  http://localhost:4000/feedback

  Home
  http://localhost:4000

  Type s + enter at any time to create a snapshot of the database
```

### Step 4: Start the Development Server (in another terminal)

```bash
cd quizapp
npm run dev
```

The app will open at `http://localhost:5173` (or the port shown in your terminal).

## 🎮 How to Use

1. **Start Screen**: Click "Start Quiz" to begin
2. **Answer Questions**: Select an answer from the options (A, B, C, or D)
3. **Auto-advance**: Click "Next Question" or wait for the timer to run out
4. **View Results**: See your score as a percentage
5. **Submit Results**: Enter your name and click "Submit Results" to save to the database
6. **Restart**: Click "Take Another Quiz" to play again

## 📡 API Endpoints

The app uses these JSON Server endpoints:

- `GET /questions` - Fetch all quiz questions
- `POST /results` - Submit quiz results with score
- `GET /results` - Retrieve all submitted results (for future features)
- `POST /feedback` - Submit feedback (for future features)

### Result Submission Payload

```json
{
  "name": "John Doe",
  "score": 8,
  "total": 10,
  "percentage": 80,
  "timestamp": "2024-12-10T10:30:00.000Z"
}
```

## 🎨 Key Component Details

### App.jsx
- Main component that orchestrates the quiz flow
- Uses `useQuiz` hook for all state management
- Uses `useMemo` to calculate quiz statistics
- Handles conditional rendering (StartScreen, Quiz, Results)

### useQuiz.js (Custom Hook)
- Manages all quiz state and logic
- Fetches questions from `/questions` endpoint
- Calculates scores and handles navigation
- Returns methods for startQuiz, selectAnswer, finishQuiz, etc.

### Timer.jsx
- Displays countdown with color changes (green → orange → red)
- Triggers `onTimeUp` callback when timer reaches 0
- Uses useEffect for interval management with cleanup

### Results.jsx
- Shows final score as a percentage
- Provides performance message based on score
- Allows students to submit their results to the API
- Shows success confirmation after submission

## 🔧 Customization

### Change Quiz Duration
Edit the `Timer` component in `QuizQuestion.jsx`:
```jsx
<Timer duration={30} onTimeUp={onTimeUp} isActive={true} />
// Change 30 to any number of seconds
```

### Add More Questions
Edit `db.json` and add more objects to the `questions` array:
```json
{
  "id": 11,
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0
}
```

### Change Colors/Styling
Update the color gradients in CSS files:
- Primary gradient: `#667eea` → `#764ba2`
- Success: `#4CAF50`
- Error: `#ff4444`

## 🐛 Troubleshooting

### "Failed to fetch questions" Error
- Make sure json-server is running on port 4000
- Check that `db.json` exists in the project root
- Verify the URL in `useQuiz.js` is correct

### Timer Not Working
- Check browser console for errors
- Ensure useEffect cleanup is properly removing intervals
- Verify `isActive` prop is being passed correctly

### Results Not Saving
- Confirm json-server is running
- Check the POST request in browser DevTools Network tab
- Verify the request body format matches the schema

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🔐 Notes

- This is a frontend-focused project with a local mock API
- In production, replace `http://localhost:4000` with your actual backend URL
- Results are stored in `db.json` (file-based, not persistent on server)
- No authentication is implemented (add if needed for production)

## 📚 Learning Points

This project demonstrates:
- Component composition and reusability
- Custom hooks for logic abstraction
- API integration with fetch
- Error and loading state management
- useEffect cleanup for subscriptions and timers
- useMemo for performance optimization
- Conditional rendering patterns
- CSS animations and transitions
- Responsive design principles

## 🎯 Future Enhancements

- Add question categories/difficulty levels
- Implement leaderboard from saved results
- Add review mode to see correct answers
- Analytics dashboard
- User authentication
- Backend database (MongoDB, PostgreSQL)
- Question randomization
- Multiple quiz modes (practice, timed, custom)

## 📄 License

Free to use and modify for educational purposes.

## 🙋 Support

If you encounter issues:
1. Check that all services (dev server, json-server) are running
2. Clear browser cache and restart dev server
3. Check browser console for error messages
4. Verify all files are in the correct directories

---

**Happy Learning! 🚀 Good luck with your React Hooks!**
