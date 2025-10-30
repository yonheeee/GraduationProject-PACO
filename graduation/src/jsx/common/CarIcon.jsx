import React from 'react';

const CarIcon = ({ color = '#0A52FF', className = '' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* 바닥 가로선 (전체) */}
      <line
        x1="0"
        y1="20"
        x2="120"
        y2="20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

  
      <path
        d="M82 14 A15 15 0 0 1 110 14"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <line
        x1="88"
        y1="14"
        x2="104"
        y2="14"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />


      <path
        d="M88 14 A9 9 0 0 1 104 14"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d="M82 14 A8 6 0 0 0 78 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M114 20 A6 6 0 0 0 110 14"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* 중앙 기둥 */}
      <line
        x1="96"
        y1="14"
        x2="96"
        y2="20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* 바퀴 사이 짧은 바(하부 바) */}
      <line
        x1="90"
        y1="20"
        x2="102"
        y2="20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* 바퀴 */}
      <circle cx="88" cy="20" r="4" fill={color} />
      <circle cx="104" cy="20" r="4" fill={color} />
    </svg>
  );
};

export default CarIcon;
