import React from 'react';

const CarIcon = ({ color = '#0A52FF', className = '' }) => {
  // viewBox 120x30, 가로선 y=20이 화면 전체를 가로지름
  // 차는 우측에 배치 (중심 x≈96)
  return (
    <svg
      className={className}
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* 바닥 가로선 */}
      <line x1="0" y1="20" x2="120" y2="20" stroke={color} strokeWidth="0.12rem" strokeLinecap="round" />

      {/* 지붕(반원) */}
      <path d="M82 14 A18 18 0 0 1 110 14" stroke={color} strokeWidth="0.125rem" fill="none" strokeLinecap="round" />

      {/* 창문(내부 반원) */}
      <path d="M88 14 A10 10 0 0 1 104 14" stroke={color} strokeWidth="0.1rem" fill="none" strokeLinecap="round" />

      {/* 휀더 아치 */}
      <path d="M84 14 A6 6 0 0 0 88 20" stroke={color} strokeWidth="0.125rem" fill="none" strokeLinecap="round" />
      <path d="M104 20 A6 6 0 0 0 108 14" stroke={color} strokeWidth="0.125rem" fill="none" strokeLinecap="round" />

      {/* 중앙 짧은 수직선 */}
      <line x1="96" y1="16" x2="96" y2="20" stroke={color} strokeWidth="0.125rem" strokeLinecap="round" />

      {/* 바퀴 */}
      <circle cx="88" cy="20" r="0.28rem" fill={color} />
      <circle cx="104" cy="20" r="0.28rem" fill={color} />
    </svg>
  );
};

export default CarIcon;
