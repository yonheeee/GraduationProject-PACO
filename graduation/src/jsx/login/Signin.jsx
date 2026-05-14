import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../login/LoginPage';
import '../../css/login/Signin.css';

import Eye from '../../images/login/eye.svg';
import CloseEye from '../../images/login/closeeye.svg';

import AuthApi from "../../api/Auth/Auth";

// 로그인
const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: '',
    pw: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // 유효성 검사
    if (!form.userId || !form.pw) {
      alert('모든 항목을 입력해주세요.'); // TODO : 토스트메시지로 변경
      return;
    }

    try {
      // API 호출
      const data = await AuthApi.login(form.userId, form.pw);

      // 토큰 저장
      localStorage.setItem('accessToken', data.token);

      alert('로그인 성공!'); // TODO : 토스트메시지로 변경
      navigate('/main');

    } catch (error) {
      // 에러 처리
      console.error(error);
      alert('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <LoginPage onButtonClick={handleSubmit} buttonText="로그인">
      <div className="si-greeting-container">
        <p className="si-greeting">복잡한 주차, 이제 PACO로 끝.</p>
        <p className="si-sub-greeting">스마트한 주차 솔루션, PACO</p>
      </div>

      <section className="si-form">
        <label className="si-field">
          <span className="si-label">ID</span>
          <div className="si-input-row">
            <input
                className="si-input"
                type="text"
                name="userId"
                value={form.userId}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder="아이디(이메일)"
            />
          </div>
        </label>

        <label className="si-field">
          <span className="si-label">PW</span>
          <div className="si-input-row">
                <input
                className="si-input"
                type="password"
                name="pw"
                value={form.pw}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder="비밀번호"
            />
          </div>
        </label>
      </section>

      <div className="si-helper-links">
        <span onClick={() => navigate('/findid')} className="link">ID 찾기</span> 
        &nbsp;/&nbsp; 
        <span onClick={() => navigate('/findpassword')} className="link">비밀번호 찾기</span>
      </div>
    </LoginPage>
  );
};

export default Signin;