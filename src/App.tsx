import { useState, useEffect, useRef } from 'react';
import Galaxy from './components/Galaxy';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TimeUpModal from './components/TimeUpModal';

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/alarm.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning && endTimeRef.current) {
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTimeRef.current! - now);
        setTimeLeft(remaining);

        if (remaining === 0) {
          handleTimeUp();
        }
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleTimeUp = () => {
    setIsRunning(false);
    setIsFlashing(true);
    setShowTimeUp(true);

    // Sound removed: no audio will be played on time up.

    setTimeout(() => setIsFlashing(false), 2000);
  };

  const handleStart = () => {
    const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
    if (totalMs > 0) {
      endTimeRef.current = Date.now() + totalMs;
      setTimeLeft(totalMs);
      setIsRunning(true);
      setShowTimeUp(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    endTimeRef.current = null;
    setShowTimeUp(false);
    setIsFlashing(false);
  };

  const displayHours = Math.floor(timeLeft / 3600000);
  const displayMinutes = Math.floor((timeLeft % 3600000) / 60000);
  const displaySeconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Galaxy />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-8">
          <h1
            className="text-7xl font-extrabold text-white mb-4"
            style={{
              fontFamily: '"Orbitron", monospace',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            MEDIVERSE
          </h1>

          <Timer
            hours={displayHours}
            minutes={displayMinutes}
            seconds={displaySeconds}
            isFlashing={isFlashing}
            isRunning={isRunning}
          />

          <Controls
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            setHours={setHours}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
          />
        </div>
      </div>

      {showTimeUp && (
        <TimeUpModal onClose={() => setShowTimeUp(false)} />
      )}
    </div>
  );
}

export default App;
