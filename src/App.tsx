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
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSpokenSecondRef = useRef<number>(-1);

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

        // Voice countdown for last 60 seconds - speak only when second actually changes
        const totalSeconds = Math.floor(remaining / 1000);
        
        if (totalSeconds <= 60 && totalSeconds > 0) {
          if (totalSeconds !== lastSpokenSecondRef.current) {
            lastSpokenSecondRef.current = totalSeconds;
            speakNumber(totalSeconds);
          }
        }

        if (remaining === 0) {
          handleTimeUp();
          lastSpokenSecondRef.current = -1;
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

  const speakNumber = (num: number) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech immediately
      window.speechSynthesis.cancel();
      
      // Small delay to ensure cancellation completes
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(num.toString());
        utterance.rate = 1.5; // Faster speaking rate for Squid Game style
        utterance.pitch = 0.7; // Lower pitch for dramatic, robotic effect
        utterance.volume = 1.0;
        utterance.lang = 'en-US';
        
        // Use a voice that sounds more robotic/mechanical if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') ||
          voice.lang === 'en-US'
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }, 50);
    }
  };

  const playDramaticAlarm = () => {
    // Create a dramatic beeping alarm sound using Web Audio API (Squid Game style)
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const audioContext = new AudioContext();
    const beepCount = 6; // Number of beeps
    const beepDuration = 0.15; // Duration of each beep
    const pauseDuration = 0.1; // Pause between beeps
    
    for (let i = 0; i < beepCount; i++) {
      const startTime = audioContext.currentTime + i * (beepDuration + pauseDuration);
      
      // Create oscillator for the beep
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Dramatic frequency (similar to emergency alarm)
      oscillator.frequency.value = i % 2 === 0 ? 1000 : 800;
      oscillator.type = 'square';
      
      // Envelope for the beep
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + beepDuration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + beepDuration);
    }
  };

  const handleTimeUp = () => {
    setIsRunning(false);
    setIsFlashing(true);
    setShowTimeUp(true);

    // Play dramatic alarm sound
    playDramaticAlarm();

    setTimeout(() => setIsFlashing(false), 2000);
  };

  const handleStart = () => {
    if (timeLeft > 0 && isPaused) {
      // Resume from paused time
      endTimeRef.current = Date.now() + timeLeft;
      setIsRunning(true);
      setIsPaused(false);
    } else {
      // Start new timer
      const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
      if (totalMs > 0) {
        endTimeRef.current = Date.now() + totalMs;
        setTimeLeft(totalMs);
        setIsRunning(true);
        setIsPaused(false);
        setShowTimeUp(false);
        lastSpokenSecondRef.current = -1;
      }
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
    // timeLeft is already set by the interval, so it will preserve the remaining time
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    endTimeRef.current = null;
    setShowTimeUp(false);
    setIsFlashing(false);
    lastSpokenSecondRef.current = -1;
    window.speechSynthesis.cancel(); // Stop any ongoing speech
  };

  const displayHours = Math.floor(timeLeft / 3600000);
  const displayMinutes = Math.floor((timeLeft % 3600000) / 60000);
  const displaySeconds = Math.floor((timeLeft % 60000) / 1000);
  
  // Highlight if time is less than 5 minutes
  const totalSecondsLeft = Math.floor(timeLeft / 1000);
  const isLastFiveMinutes = totalSecondsLeft <= 300 && totalSecondsLeft > 0;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Galaxy />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-2 sm:mb-4 text-center"
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
            isLastFiveMinutes={isLastFiveMinutes}
          />

          <Controls
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            setHours={setHours}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            isRunning={isRunning}
            isPaused={isPaused}
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
