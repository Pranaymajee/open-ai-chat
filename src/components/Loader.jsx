import React from 'react';

const Loader = () => {
  const keyframes = `
    @keyframes scaleUp {
      0% { transform: translate(-50%, -50%) scale(0) }
      60%, 100% { transform: translate(-50%, -50%) scale(1) }
    }
    @keyframes pulse {
      0%, 60%, 100% { transform: scale(1) }
      80% { transform: scale(1.2) }
    }
  `;

  return (
    <div style={{
      width: '24px', 
      height: '24px', 
      border: '5px solid #61677A', 
      borderRadius: '50%',
      display: 'inline-block',
      boxSizing: 'border-box',
      position: 'relative',
      animation: 'pulse 1s linear infinite',
    }}>
      <div style={{
        position: 'absolute',
        width: '24px', 
        height: '24px', 
        border: '5px solid #61677A',
        borderRadius: '50%',
        display: 'inline-block',
        boxSizing: 'border-box',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'scaleUp 1s linear infinite',
      }}></div>
      <style>{keyframes}</style>
    </div>
  );
}

export default Loader;
