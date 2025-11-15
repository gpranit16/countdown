import { useEffect, useState } from 'react';

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  isFlashing: boolean;
  isRunning: boolean;
  isLastFiveMinutes: boolean;
}

const Timer = ({ hours, minutes, seconds, isFlashing, isRunning, isLastFiveMinutes }: TimerProps) => {
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

  return (
    <div className={`relative transition-all duration-300 ${isFlashing ? 'animate-pulse' : ''}`}>
      <div
        className="relative"
        style={{
          filter: isLastFiveMinutes
            ? 'drop-shadow(0 0 30px rgba(255, 0, 0, 0.8))'
            : 'drop-shadow(0 0 30px rgba(220, 20, 60, 0.6))',
        }}
      >
        <div
          className="relative px-3 py-2 sm:px-6 sm:py-4 md:px-12 md:py-8"
          style={{
            background: isLastFiveMinutes 
              ? 'linear-gradient(135deg, #DC143C 0%, #FF0000 25%, #FF4500 50%, #FF0000 75%, #DC143C 100%)'
              : 'linear-gradient(135deg, #8B0000 0%, #DC143C 25%, #FF0000 50%, #DC143C 75%, #8B0000 100%)',
            borderRadius: '8px',
          }}
        >
          <div
            className="relative px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8"
            style={{
              background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0.95), rgba(5, 5, 10, 0.98))',
              borderRadius: '4px',
              border: isLastFiveMinutes 
                ? '3px solid rgba(255, 0, 0, 0.7)'
                : '3px solid rgba(220, 20, 60, 0.5)',
              boxShadow: isLastFiveMinutes
                ? 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 0 80px rgba(255, 0, 0, 0.5)'
                : 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 0 80px rgba(255, 0, 100, 0.3)',
            }}
          >
            <div
              className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider ${
                isFlashing ? 'text-red-400' : isLastFiveMinutes ? 'text-yellow-300' : 'text-white'
              }`}
              style={{
                textShadow: isFlashing
                  ? '0 0 50px rgba(255, 0, 0, 1), 0 0 100px rgba(255, 0, 0, 0.85)'
                  : isLastFiveMinutes
                  ? '0 0 50px rgba(255, 255, 0, 1), 0 0 100px rgba(255, 255, 0, 0.7)'
                  : '0 0 50px rgba(255, 255, 255, 1), 0 0 100px rgba(255, 255, 255, 0.7)',
                fontFamily: '"Orbitron", "Digital-7", monospace',
                letterSpacing: '0.15em',
              }}
            >
              <SevenSegmentDisplay value={formatDigit(hours)} isLastFiveMinutes={isLastFiveMinutes} />
              <span className={`${showColon ? 'opacity-100' : 'opacity-0'} transition-opacity`}>:</span>
              <SevenSegmentDisplay value={formatDigit(minutes)} isLastFiveMinutes={isLastFiveMinutes} />
              <span className={`${showColon ? 'opacity-100' : 'opacity-0'} transition-opacity`}>:</span>
              <SevenSegmentDisplay value={formatDigit(seconds)} isLastFiveMinutes={isLastFiveMinutes} />
            </div>
          </div>
        </div>

        <div
          className="absolute -inset-2 rounded-xl opacity-50 blur-md"
          style={{
            background: isLastFiveMinutes
              ? 'linear-gradient(135deg, #FF0000 0%, #FF4500 50%, #FF0000 100%)'
              : 'linear-gradient(135deg, #DC143C 0%, #8B0000 50%, #DC143C 100%)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
};

const SevenSegmentDisplay = ({ value, isLastFiveMinutes }: { value: string; isLastFiveMinutes: boolean }) => {
  return (
    <div className="flex gap-1 sm:gap-2">
      {value.split('').map((digit, index) => (
        <Digit key={index} value={digit} isLastFiveMinutes={isLastFiveMinutes} />
      ))}
    </div>
  );
};

const Digit = ({ value, isLastFiveMinutes }: { value: string; isLastFiveMinutes: boolean }) => {
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
    <div className="relative inline-block w-10 h-16 sm:w-16 sm:h-28 md:w-20 md:h-32">
      <Segment active={active[0]} className="top-0 left-1/2 -translate-x-1/2" horizontal isLastFiveMinutes={isLastFiveMinutes} />
      <Segment active={active[1]} className="top-1 left-0" vertical isLastFiveMinutes={isLastFiveMinutes} />
      <Segment active={active[2]} className="top-1 right-0" vertical isLastFiveMinutes={isLastFiveMinutes} />
      <Segment active={active[3]} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" horizontal isLastFiveMinutes={isLastFiveMinutes} />
      <Segment active={active[4]} className="bottom-1 left-0" vertical isLastFiveMinutes={isLastFiveMinutes} />
      <Segment active={active[5]} className="bottom-1 right-0" vertical isLastFiveMinutes={isLastFiveMinutes} />
      <Segment active={active[6]} className="bottom-0 left-1/2 -translate-x-1/2" horizontal isLastFiveMinutes={isLastFiveMinutes} />
    </div>
  );
};

const Segment = (props: { active: boolean; className: string; horizontal?: boolean; vertical?: boolean; isLastFiveMinutes: boolean }) => {
  const { active, className, horizontal, isLastFiveMinutes } = props;

  const segmentColor = active ? (isLastFiveMinutes ? '#FFFF00' : '#FFFFFF') : 'rgba(255, 255, 255, 0.05)';
  const segmentGlow = active
    ? isLastFiveMinutes
      ? '0 0 20px rgba(255, 255, 0, 1), 0 0 40px rgba(255, 255, 0, 0.8)'
      : '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)'
    : 'none';

  return (
    <div
      className={`absolute ${className} transition-all duration-100`}
      style={{
        width: horizontal ? '75%' : '15%',
        height: horizontal ? '15%' : '45%',
        backgroundColor: segmentColor,
        boxShadow: segmentGlow,
        clipPath: horizontal
          ? 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)'
          : 'polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)',
      }}
    />
  );
};

export default Timer;
