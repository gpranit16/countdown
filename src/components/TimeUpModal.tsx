interface TimeUpModalProps {
  onClose: () => void;
}

const TimeUpModal = ({ onClose }: TimeUpModalProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn"
      style={{
        background: 'rgba(0, 0, 0, 0.9)',
      }}
      onClick={onClose}
    >
      <div
        className="relative px-16 py-12 rounded-xl animate-scaleIn"
        style={{
          background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
          boxShadow: '0 0 100px rgba(255, 0, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.2)',
        }}
      >
        <h1
          className="text-8xl font-bold text-white text-center"
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(255, 255, 255, 0.6)',
            fontFamily: '"Orbitron", monospace',
          }}
        >
          TIME'S UP!
        </h1>

        <button
          onClick={onClose}
          className="mt-8 w-full px-8 py-3 text-xl font-bold text-white rounded-lg transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #000000, #333333)',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default TimeUpModal;
