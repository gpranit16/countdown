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
        className="relative px-8 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12 rounded-xl animate-scaleIn max-w-2xl mx-4"
        style={{
          background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
          boxShadow: '0 0 100px rgba(255, 0, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.2)',
        }}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-4"
          style={{
            textShadow: '0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(255, 255, 255, 0.6)',
            fontFamily: '"Orbitron", monospace',
          }}
        >
          TIME'S UP!
        </h1>
        
        <div className="text-center mb-6">
          <p
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300"
            style={{
              textShadow: '0 0 20px rgba(255, 255, 0, 0.8)',
              fontFamily: '"Orbitron", monospace',
            }}
          >
            🎉 CONGRATULATIONS 🎉
          </p>
        </div>

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
