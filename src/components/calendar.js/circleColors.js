import React from 'react';

export const CircleColors = () => {
  const colors = [
    { type: "My offers", color: '#87CEEB' },
    { type: "Matched request", color: '#FFA07A' },
    { type: "Unmatched request", color: '#FFD700' }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', margin: "20px" }}>
      {/* Creating four circles with alternating colors in one line */}
      {colors.map((color, index) => (
        <div key={`circle-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div className="circle" style={{ backgroundColor: color.color, width: "25px", height: "25px", borderRadius: "50%", marginRight: '5px' }}></div>
          <span>{color.type}</span>
        </div>
      ))}
    </div>
  );
}
