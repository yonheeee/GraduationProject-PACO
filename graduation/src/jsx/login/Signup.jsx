import React, { useState } from 'react';
import LoginPage from '../login/LoginPage'; 

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
    // TODO: 닉네임 중복확인 API 연동
    alert(`닉네임 중복확인: ${form.nickname}`);
  };
  const checkUserId = () => {
    // TODO: 아이디 중복확인 API 연동
    alert(`아이디 중복확인: ${form.userId}`);
  };

  const handleSubmit = () => {
    // 간단 예시 검증
    if (!form.nickname || !form.userId || !form.pw || !form.pw2) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (form.pw !== form.pw2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: 회원가입 API 호출
    alert('회원가입!');
  };

  return (
    <LoginPage onButtonClick={handleSubmit} buttonText="회원가입">
      {/* 상단 텍스트/로고 아래 안내문 */}
      <p className="su-greeting">방문해 주셔서 감사합니다 !</p>

      {/* 폼 래퍼(연한 블루 배경 느낌 섹션) */}
      <section className="su-form">
        {/* NICKNAME */}
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

        {/* ID */}
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

        {/* PW */}
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
              {/* 눈 아이콘 (inline SVG) */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="#0A52FF" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" stroke="#0A52FF" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </label>

        {/* PW 확인 */}
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

      {/* 하단 보조 링크 */}
      <div className="su-helper-links">ID 찾기 / 비밀번호 찾기</div>
    </LoginPage>
  );
};

export default Signup;
