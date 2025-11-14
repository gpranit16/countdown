import { useEffect, useState } from 'react';

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  isFlashing: boolean;
  isRunning: boolean;
}

const Timer = ({ hours, minutes, seconds, isFlashing, isRunning }: TimerProps) => {
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setShowColon((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setShowColon(true);
    }
  }, [isRunning]);

  const formatDigit = (num: number) => String(num).padStart(2, '0');

  const timerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Increase brightness
    boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.8)', // Enhance glow effect
    border: '2px solid rgba(255, 255, 255, 0.8)', // Add border for better visibility
    color: '#000', // Use black text for contrast
  };

  return (
    <div style={timerStyle} className={`relative transition-all duration-300 ${isFlashing ? 'animate-pulse' : ''} w-full max-w-full overflow-x-auto`}>
      <div
        className="relative"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(255, 0, 100, 0.6))',
        }}
      >
        <div
          className="relative px-3 py-2 sm:px-6 sm:py-4 md:px-12 md:py-8"
          style={{
            background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 25%, #FFD700 50%, #DAA520 75%, #B8860B 100%)',
            borderRadius: '8px',
            padding: '4px sm:6px md:8px',
          }}
        >
          <div
            className="relative"
            style={{
              background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0.95), rgba(5, 5, 10, 0.98))',
              borderRadius: '4px',
              padding: '16px 20px sm:24px 32px md:32px 48px',
              border: '2px sm:3px solid rgba(218, 165, 32, 0.5)',
              boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 0 80px rgba(255, 0, 100, 0.3)',
            }}
          >
            <div
              className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider ${
                isFlashing ? 'text-red-400' : 'text-white'
              }`}
              style={{
                textShadow: isFlashing
                  ? '0 0 50px rgba(255, 0, 0, 1), 0 0 100px rgba(255, 0, 0, 0.85)'
                  : '0 0 50px rgba(255, 255, 255, 1), 0 0 100px rgba(255, 255, 255, 0.7)',
                fontFamily: '"Orbitron", "Digital-7", monospace',
                letterSpacing: '0.15em',
              }}
            >
              <SevenSegmentDisplay value={formatDigit(hours)} />
              <span className={`${showColon ? 'opacity-100' : 'opacity-0'} transition-opacity`}>:</span>
              <SevenSegmentDisplay value={formatDigit(minutes)} />
              <span className={`${showColon ? 'opacity-100' : 'opacity-0'} transition-opacity`}>:</span>
              <SevenSegmentDisplay value={formatDigit(seconds)} />
            </div>
          </div>
        </div>

        <div
          className="absolute -inset-2 rounded-xl opacity-50 blur-md"
          style={{
            background: 'linear-gradient(135deg, #FF0066 0%, #FF66CC 50%, #FF0066 100%)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
};

const SevenSegmentDisplay = ({ value }: { value: string }) => {
  return (
    <div className="flex gap-1 sm:gap-2">
      {value.split('').map((digit, index) => (
        <Digit key={index} value={digit} />
      ))}
    </div>
  );
};

const Digit = ({ value }: { value: string }) => {
  const segments: Record<string, boolean[]> = {
    '0': [true, true, true, false, true, true, true],
    '1': [false, false, true, false, false, true, false],
    '2': [true, false, true, true, true, false, true],
    '3': [true, false, true, true, false, true, true],
    '4': [false, true, true, true, false, true, false],
    '5': [true, true, false, true, false, true, true],
    '6': [true, true, false, true, true, true, true],
    '7': [true, false, true, false, false, true, false],
    '8': [true, true, true, true, true, true, true],
    '9': [true, true, true, true, false, true, true],
  };

  const active = segments[value] || [false, false, false, false, false, false, false];

  return (
    <div className="relative inline-block w-8 h-14 sm:w-12 sm:h-20 md:w-16 md:h-28 lg:w-20 lg:h-32 xl:w-24 xl:h-36">
      <Segment active={active[0]} className="top-0 left-1/2 -translate-x-1/2" horizontal />
      <Segment active={active[1]} className="top-0.5 sm:top-1 md:top-2 left-0" vertical />
      <Segment active={active[2]} className="top-0.5 sm:top-1 md:top-2 right-0" vertical />
      <Segment active={active[3]} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" horizontal />
      <Segment active={active[4]} className="bottom-0.5 sm:bottom-1 md:bottom-2 left-0" vertical />
      <Segment active={active[5]} className="bottom-0.5 sm:bottom-1 md:bottom-2 right-0" vertical />
      <Segment active={active[6]} className="bottom-0 left-1/2 -translate-x-1/2" horizontal />
    </div>
  );
};

const Segment = (props: { active: boolean; className: string; horizontal?: boolean; vertical?: boolean }) => {
  const { active, className, horizontal } = props;

  // Responsive segment sizes using CSS custom properties via inline styles
  const getSegmentStyle = () => {
    if (horizontal) {
      return {
        width: 'clamp(24px, 6vw, 60px)', // Responsive width for horizontal segments
        height: 'clamp(4px, 1.2vw, 12px)', // Responsive height for horizontal segments
      };
    } else {
      return {
        width: 'clamp(4px, 1.2vw, 12px)', // Responsive width for vertical segments
        height: 'clamp(24px, 6vw, 60px)', // Responsive height for vertical segments
      };
    }
  };

  return (
    <div
      className={`absolute ${className} transition-all duration-100`}
      style={{
        ...getSegmentStyle(),
        backgroundColor: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.00005)',
        boxShadow: active
          ? '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.8)'
          : 'none',
        clipPath: horizontal
          ? 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)'
          : 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)',
      }}
    />
  );
};

export default Timer;
