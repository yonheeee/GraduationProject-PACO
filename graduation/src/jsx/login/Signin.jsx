import React, { useState } from 'react';
import LoginPage from '../login/LoginPage';
import '../../css/login/Signin.css';

const Signin = () => {
  const [form, setForm] = useState({
    userId: '',
    pw: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.userId || !form.pw) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    alert('로그인!');
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
                placeholder="아이디"
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
                placeholder="비밀번호"
            />
          </div>
        </label>
      </section>

      <div className="si-helper-links">ID 찾기 / 비밀번호 찾기</div>
    </LoginPage>
  );
};

export default Signin;