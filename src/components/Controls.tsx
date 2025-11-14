interface ControlsProps {
  hours: number;
  minutes: number;
  seconds: number;
  setHours: (value: number) => void;
  setMinutes: (value: number) => void;
  setSeconds: (value: number) => void;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Controls = ({
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
  isRunning,
  onStart,
  onPause,
  onReset,
}: ControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      {!isRunning && (
        <div className="flex gap-4 items-center">
          <TimeInput
            label="Hours"
            value={hours}
            onChange={setHours}
            max={999}
          />
          <span className="text-white text-2xl font-bold">:</span>
          <TimeInput
            label="Minutes"
            value={minutes}
            onChange={setMinutes}
            max={59}
          />
          <span className="text-white text-2xl font-bold">:</span>
          <TimeInput
            label="Seconds"
            value={seconds}
            onChange={setSeconds}
            max={59}
          />
        </div>
      )}

      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="px-8 py-3 text-lg font-bold text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FF0066, #FF66CC)',
              boxShadow: '0 0 30px rgba(255, 0, 102, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            START
          </button>
        ) : (
          <>
            <button
              onClick={onPause}
              className="px-8 py-3 text-lg font-bold text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #FF6600, #FFCC66)',
                boxShadow: '0 0 30px rgba(255, 102, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)',
              }}
            >
              PAUSE
            </button>
            <button
              onClick={onReset}
              className="px-8 py-3 text-lg font-bold text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #666666, #999999)',
                boxShadow: '0 0 30px rgba(102, 102, 102, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)',
              }}
            >
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const TimeInput = ({
  label,
  value,
  onChange,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    onChange(Math.min(Math.max(0, newValue), max));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-white text-sm font-semibold uppercase tracking-wider">{label}</label>
      <input
        type="number"
        min="0"
        max={max}
        value={value}
        onChange={handleChange}
        className="w-20 px-3 py-2 text-center text-xl font-bold rounded-lg outline-none transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 0, 102, 0.5)',
          color: 'white',
          boxShadow: '0 0 20px rgba(255, 0, 102, 0.3)',
        }}
      />
    </div>
  );
};

export default Controls;
