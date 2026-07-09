import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/common/Footer.css';

const navItems = [
  { label: '홈', path: '/main' },
  { label: '커뮤니티', path: '/community' },
  { label: '마이페이지', path: '/mypage' },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="footer-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          type="button"
          className={location.pathname === item.path ? 'active' : ''}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </footer>
  );
}