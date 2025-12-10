# 💌 Feedback Portal App

A modern React application for collecting user feedback and displaying statistics. Built with React 18, Vite, and JSON Server, featuring real-time feedback submission and comprehensive statistics visualization.

## 🎯 Features

- **Feedback Form**: User-friendly form with validation for submitting feedback
  - Name, Email, Rating (1-5), and Comments fields
  - Form validation with helpful error messages
  - Success confirmation message after submission
  - Real-time form reset after successful submission

- **Feedback Display**: Dynamic list showing all submitted feedback
  - Live feedback list with instant updates
  - Sort feedback (Most Recent, Highest Rating, Lowest Rating)
  - Timestamp display for each entry
  - Rating visualization with stars (⭐)

- **Statistics & Analytics**: Real-time computed statistics
  - Total feedback count
  - Average rating calculation (1 decimal place)
  - Rating breakdown (count for each 1-5 rating)
  - Visual bar chart showing rating distribution

- **Responsive Design**: Mobile-first, fully responsive UI
  - Adaptive layout (side-by-side on desktop, stacked on mobile)
  - Touch-friendly controls on mobile devices
  - Optimized scrolling with custom scrollbar styling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Navigate to project directory**:
   ```bash
   cd feedbackapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server** (in first terminal):
   ```bash
   npm run dev
   ```
   App will be available at `http://localhost:5174`

4. **Start JSON Server** (in second terminal):
   ```bash
   npx json-server --watch db.json --port 4000
   ```
   API will be available at `http://localhost:4000`

## 📁 Project Structure

```
feedbackapp/
├── src/
│   ├── components/
│   │   ├── FeedbackForm.jsx      # Form component for submitting feedback
│   │   └── FeedbackList.jsx      # List component displaying all feedback
│   ├── hooks/
│   │   └── useFeedback.js        # Custom hook for feedback API logic
│   ├── styles/
│   │   ├── App.css               # Main layout styling
│   │   ├── FeedbackForm.css      # Form component styling
│   │   ├── FeedbackList.css      # List component styling
│   │   └── index.css             # Global styles and utilities
│   ├── App.jsx                   # Main component
│   └── main.jsx                  # Entry point
├── db.json                       # Mock database with feedback data
├── vite.config.js               # Vite configuration
└── package.json                 # Project dependencies

```

## 🔌 API Endpoints

All endpoints run on `http://localhost:4000`

### GET /feedback
Retrieve all feedback entries

**Response**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "comments": "Great app!",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

### POST /feedback
Submit new feedback

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "rating": 4,
  "comments": "Very helpful and easy to use",
  "timestamp": "2024-01-15T11:00:00.000Z"
}
```

## ⚛️ React Hooks Used

### 1. **useState**
Used for managing component-level state:
- **FeedbackForm.jsx**: Form field values (name, email, rating, comments), submission states
- **FeedbackList.jsx**: Sort preference, UI states

### 2. **useEffect**
Used for side effects:
- **useFeedback.js**: Fetches feedback list on component mount with cleanup

### 3. **useMemo**
Used for performance optimization:
- **FeedbackList.jsx**: Memoizes computed statistics (total, averageRating, ratingBreakdown) and sorted feedback based on feedbackList and sortBy dependencies

### 4. **Custom Hook - useFeedback**
Encapsulates all feedback-related API logic:
```javascript
const {
  feedbackList,      // Array of all feedback
  loading,           // Loading state during fetch
  error,             // Error message if any
  submitting,        // Loading state during submission
  submitFeedback     // Function to submit new feedback
} = useFeedback();
```

## 📊 Component Hierarchy

```
App
├── Header
├── Form Section
│   └── FeedbackForm
└── List Section
    └── FeedbackList
        ├── Statistics Cards
        ├── Rating Breakdown
        └── Feedback Items
```

## 🎨 Styling Features

- **Color Scheme**: Purple gradient (#667eea → #764ba2)
- **Animations**: Smooth transitions and slide-in effects
- **Responsive**: Mobile-first design with breakpoints at 1024px and 768px
- **Accessibility**: Clear visual hierarchy and intuitive controls

## 🧪 Testing the App

1. **Test Form Submission**:
   - Fill in all form fields
   - Submit the form
   - Confirm success message appears
   - Verify new entry appears in feedback list

2. **Test Form Validation**:
   - Try submitting with empty fields
   - Verify error messages display
   - Try entering invalid email
   - Confirm form prevents invalid submission

3. **Test Sorting**:
   - Select "Most Recent" - newest feedback first
   - Select "Highest Rating" - highest rated feedback first
   - Select "Lowest Rating" - lowest rated feedback first

4. **Test Statistics**:
   - Add multiple feedback entries with different ratings
   - Verify total count updates
   - Verify average rating calculates correctly
   - Verify rating breakdown shows correct distribution

5. **Test Responsiveness**:
   - Resize browser window
   - Verify layout adapts (side-by-side → stacked)
   - Test on mobile device or use mobile view

## 📦 Dependencies

- **react** (18.x): UI library
- **react-dom** (18.x): React DOM rendering
- **vite** (7.x): Build tool and dev server
- **json-server** (latest): Mock REST API server

## 🔄 Data Flow

1. **Initial Load**:
   ```
   App mounts → useFeedback useEffect runs → fetchFeedback()
   → GET /feedback → feedbackList state updates → FeedbackList renders
   ```

2. **Form Submission**:
   ```
   Form submit → handleSubmitFeedback() → submitFeedback()
   → POST /feedback → useFeedback refetches → FeedbackList re-renders
   ```

3. **Sorting**:
   ```
   Sort dropdown change → setSortBy() → useMemo recalculates
   → FeedbackList re-renders with sorted data
   ```

## 🐛 Troubleshooting

**Port already in use?**
- Dev server: Change port in vite.config.js
- JSON Server: Use different port with `--port 5000`

**API connection refused?**
- Ensure JSON Server is running on port 4000
- Check firewall settings
- Verify fetch URLs match server port

**Form not submitting?**
- Check browser console for errors
- Verify JSON Server is running
- Check network tab in DevTools

**Statistics not updating?**
- Confirm useMemo dependencies are correct
- Check that feedbackList state is updating
- Verify API response includes all fields

## 📝 Notes

- Each feedback entry automatically gets a timestamp
- Ratings are integers from 1-5
- Email validation uses simple '@' check
- All fields are required for form submission
- Feedback is persisted in db.json (JSON Server file-based storage)

## 🎓 Learning Outcomes

This project demonstrates:
- React functional components and Hooks
- Custom Hook creation for logic reuse
- useEffect for data fetching with cleanup
- useMemo for performance optimization
- Controlled components and form handling
- Responsive CSS with Flexbox and Grid
- API integration with Fetch
- State management patterns
- Component composition and prop drilling

## 📄 License

Open source project for educational purposes.

---

**Happy Coding! 💻** If you have questions or suggestions, feel free to modify and experiment with the code!
