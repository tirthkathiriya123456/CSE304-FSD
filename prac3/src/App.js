import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Welcome to CHARUSAT!!!!</h1>
      <p className="date">📅 It is {currentTime.toLocaleDateString()}</p>
      <p className="time">⏰ It is {currentTime.toLocaleTimeString()}</p>
      <footer className="footer">
</footer>

    </div>
  );
}

export default App;
