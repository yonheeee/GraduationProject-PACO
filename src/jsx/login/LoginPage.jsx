import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarIcon from '../common/CarIcon';
import '../../css/login/LoginPage.css';
import Logo from '../../images/common/logo.svg';
import BackBtn from '../../images/common/backbtn.svg';

const LoginPage = ({ children, onButtonClick, buttonText = '로그인' }) => {
  const navigate = useNavigate();

  return (
    <div className="loginpage-container">
      <CarIcon color="#003FBF" />
      <header className="loginpage-header">
        <button className="loginpage-back" onClick={() => navigate(-1)}>
            <img src={BackBtn} alt="뒤로가기" />
        </button>
        <img src={Logo} alt="PACO 로고" className="loginpage-logo" />
      </header>

      <div className="loginpage-content">{children}</div>


      <button className="loginpage-btn" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default LoginPage;
