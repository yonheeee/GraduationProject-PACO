import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/common/Footer.css';

const navItems = [
  { label: 'Home', path: '/main' },
  { label: 'Community', path: '/community' },
  { label: 'My', path: '/mypage' },
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
