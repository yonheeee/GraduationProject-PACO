import React from 'react';
import '../../css/common/Header.css';
import Alarm from '../../images/main/alarm.svg';
import Search from '../../images/main/search.svg'; 
import Logo from '../../images/common/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img src={Alarm} alt="alarm" className={`icon alarm`} />
      <img src={Logo} alt="logo" className="logo" />
      <img src={Search} alt="search" className={`icon search`} />
    </header>
  );
}
