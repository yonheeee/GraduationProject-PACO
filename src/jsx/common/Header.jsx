import React from 'react';
import '../../css/common/Header.css';
import Alarm from '../../images/main/alarm.svg';
import Search from '../../images/main/search.svg'; 
import Logo from '../../images/common/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img src={Alarm} alt="알림" className={`icon alarm`} />
      <img src={Logo} alt="logo" className="logo" />
      <img src={Search} alt="검색" className={`icon search`} />
    </header>
  );
}
