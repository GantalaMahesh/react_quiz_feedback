import { useState, useEffect } from 'react';
import '../styles/Timer.css';

export const Timer = ({ duration = 30, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const getTimerColor = () => {
    if (timeLeft <= 5) return '#ff4444';
    if (timeLeft <= 10) return '#ffa500';
    return '#4CAF50';
  };

  return (
    <div className="timer-container">
      <div className="timer-circle" style={{ borderColor: getTimerColor() }}>
        <span className="timer-text" style={{ color: getTimerColor() }}>
          {timeLeft}s
        </span>
      </div>
    </div>
  );
};
