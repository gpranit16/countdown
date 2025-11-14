const GuardsRow = () => {
  return (
    <div className="flex gap-8 mt-8">
      <Guard shape="square" />
      <Guard shape="circle" />
      <Guard shape="triangle" />
    </div>
  );
};

const Guard = ({ shape }: { shape: 'square' | 'circle' | 'triangle' }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-24 h-32 rounded-t-full"
        style={{
          background: 'linear-gradient(180deg, #FF0066 0%, #CC0052 100%)',
          boxShadow: '0 0 30px rgba(255, 0, 102, 0.5)',
        }}
      >
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-20 flex items-center justify-center rounded"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
            border: '3px solid #2a2a2a',
          }}
        >
          <Shape type={shape} />
        </div>
      </div>

      <div
        className="w-20 h-24"
        style={{
          background: 'linear-gradient(180deg, #CC0052 0%, #990040 100%)',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        }}
      />
    </div>
  );
};

const Shape = ({ type }: { type: 'square' | 'circle' | 'triangle' }) => {
  const baseStyle = {
    width: '40px',
    height: '40px',
    border: '3px solid white',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  };

  if (type === 'circle') {
    return <div style={{ ...baseStyle, borderRadius: '50%' }} />;
  }

  if (type === 'triangle') {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid white',
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
        }}
      />
    );
  }

  return <div style={baseStyle} />;
};

export default GuardsRow;
