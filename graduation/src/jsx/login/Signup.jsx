import React, { useState } from 'react';
import LoginPage from '../login/LoginPage'; 
import '../../css/login/Signup.css';

import Eye from '../../images/login/eye.svg';
import CloseEye from '../../images/login/closeeye.svg';

const Signup = () => {
  const [form, setForm] = useState({
    nickname: '',
    userId: '',
    pw: '',
    pw2: '',
    showPw: false,
    showPw2: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const togglePw = () => setForm((s) => ({ ...s, showPw: !s.showPw }));
  const togglePw2 = () => setForm((s) => ({ ...s, showPw2: !s.showPw2 }));

  const checkNickname = () => {

    alert(`닉네임 중복확인: ${form.nickname}`);
  };
  const checkUserId = () => {
   
    alert(`아이디 중복확인: ${form.userId}`);
  };

  const handleSubmit = () => {

    if (!form.nickname || !form.userId || !form.pw || !form.pw2) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (form.pw !== form.pw2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert('회원가입!');
  };

  return (
    <LoginPage onButtonClick={handleSubmit} buttonText="회원가입">
     
      <p className="su-greeting">방문해 주셔서 감사합니다 !</p>

      <section className="su-form">
        <label className="su-field">
          <span className="su-label">NICKNAME</span>
          <div className="su-input-row">
            <input
              className="su-input"
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해요"
              value={form.nickname}
              onChange={onChange}
              autoComplete="off"
            />
            <button
              type="button"
              className="su-right-btn"
              onClick={checkNickname}
              disabled={!form.nickname.trim()}
            >
              중복확인
            </button>
          </div>
        </label>


        <label className="su-field">
          <span className="su-label">ID</span>
          <div className="su-input-row">
            <input
              className="su-input"
              type="text"
              name="userId"
              placeholder="아이디를 입력해요"
              value={form.userId}
              onChange={onChange}
              autoComplete="off"
            />
            <button
              type="button"
              className="su-right-btn"
              onClick={checkUserId}
              disabled={!form.userId.trim()}
            >
              중복확인
            </button>
          </div>
        </label>

        <label className="su-field">
          <span className="su-label">PW</span>
          <div className="su-input-row">
            <input
              className="su-input"
              type={form.showPw ? 'text' : 'password'}
              name="pw"
              placeholder="비밀번호를 입력해요"
              value={form.pw}
              onChange={onChange}
              autoComplete="new-password"
              
            />
            <button type="button" className="su-icon-btn" onClick={togglePw} aria-label="비밀번호 표시 전환">

              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="#0A52FF" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" stroke="#0A52FF" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </label>

        <label className="su-field">
          <div className="su-input-row">
            <input
              className="su-input"
              type={form.showPw2 ? 'text' : 'password'}
              name="pw2"
              placeholder="비밀번호를 확인해요"
              value={form.pw2}
              onChange={onChange}
              autoComplete="new-password"
            />
            <button type="button" className="su-icon-btn" onClick={togglePw2} aria-label="비밀번호 표시 전환">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="#0A52FF" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" stroke="#0A52FF" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </label>
      </section>
      <div className="su-helper-links">ID 찾기 / 비밀번호 찾기</div>
    </LoginPage>
    
  );
};

export default Signup;
