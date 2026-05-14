import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../login/LoginPage';
import '../../css/login/Signup.css';

import AuthApi from '../../api/Auth/Auth';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePw = () => setForm((s) => ({ ...s, showPw: !s.showPw }));
  const togglePw2 = () => setForm((s) => ({ ...s, showPw2: !s.showPw2 }));

  // // 닉네임 중복확인
  // const checkNickname = async () => {
  //   try {
  //     const res = await axios.get(`/api/check-username?username=${form.nickname}`);
  //     alert(res.data.message);
  //   } catch (err) {
  //     alert(err.response?.data?.error || "이미 사용 중인 닉네임입니다.");
  //   }
  // };
  //
  // // 이메일 중복확인
  // const checkEmail = async () => {
  //   try {
  //     const res = await axios.get(`/api/check-email?email=${form.email}`);
  //     alert(res.data.message);
  //   } catch (err) {
  //     alert(err.response?.data?.error || "이미 사용 중인 이메일입니다.");
  //   }
  // };

  // 회원가입 요청
  const handleSubmit = async () => {
    // 유효성 검사
    if (!form.nickname || !form.email || !form.password) {
      return alert("모든 항목을 입력해주세요."); // TODO : 토스트 메시지로 변경
    }
    if (form.password !== form.password2) {
      return alert("비밀번호가 일치하지 않습니다."); // TODO : 토스트 메시지로 변경
    }

    try {
      // API 호출
      const requestBody = {
        email: form.email,
        password: form.password,
        username: form.nickname, // FE는 nickname, BE는 username
      };

      await AuthApi.signup(requestBody);

      alert("회원가입 완료! 로그인 페이지로 이동할게요.");  // TODO : 토스트 메시지로 변경
      navigate("/signin");

    } catch (err) {
      alert(err.response?.data?.message || "회원가입 실패"); // TODO : 토스트 메시지로 변경
    }
  };

  return (
      <LoginPage onButtonClick={handleSubmit} buttonText="회원가입">
        <p className="su-greeting">방문해 주셔서 감사합니다 !</p>

        <section className="su-form">

          {/* 닉네임 */}
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
              />
              {/*<button*/}
              {/*    type="button"*/}
              {/*    className="su-right-btn"*/}
              {/*    onClick={checkNickname}*/}
              {/*    disabled={!form.nickname.trim()}*/}
              {/*>*/}
              {/*  중복확인*/}
              {/*</button>*/}
            </div>
          </label>

          {/* 이메일 */}
          <label className="su-field">
            <span className="su-label">EMAIL</span>
            <div className="su-input-row">
              <input
                  className="su-input"
                  type="email"
                  name="email"
                  placeholder="아이디(이메일)을 입력해요"
                  value={form.email}
                  onChange={onChange}
              />
              {/*<button*/}
              {/*    type="button"*/}
              {/*    className="su-right-btn"*/}
              {/*    onClick={checkEmail}*/}
              {/*    disabled={!form.email.trim()}*/}
              {/*>*/}
              {/*  중복확인*/}
              {/*</button>*/}
            </div>
          </label>

          {/*/!* 이름 *!/*/}
          {/*<label className="su-field">*/}
          {/*  <span className="su-label">NAME</span>*/}
          {/*  <input*/}
          {/*      className="su-input"*/}
          {/*      type="text"*/}
          {/*      name="name"*/}
          {/*      placeholder="이름을 입력해요"*/}
          {/*      value={form.name}*/}
          {/*      onChange={onChange}*/}
          {/*  />*/}
          {/*</label>*/}

          {/*/!* 전화번호 *!/*/}
          {/*<label className="su-field">*/}
          {/*  <span className="su-label">PHONE</span>*/}
          {/*  <input*/}
          {/*      className="su-input"*/}
          {/*      type="text"*/}
          {/*      name="phone"*/}
          {/*      placeholder="010으로 시작하는 번호"*/}
          {/*      value={form.phone}*/}
          {/*      onChange={onChange}*/}
          {/*  />*/}
          {/*</label>*/}

          {/* 비밀번호 */}
          <label className="su-field">
            <span className="su-label">PW</span>
            <div className="su-input-row">
              <input
                  className="su-input"
                  type={form.showPw ? "text" : "password"}
                  name="password"
                  placeholder="비밀번호를 입력해요"
                  value={form.password}
                  onChange={onChange}
              />
              <button type="button" className="su-icon-btn" onClick={togglePw}>
                👁
              </button>
            </div>
          </label>

          {/* 비밀번호 확인 */}
          <label className="su-field">
            <div className="su-input-row">
              <input
                  className="su-input"
                  type={form.showPw2 ? "text" : "password"}
                  name="password2"
                  placeholder="비밀번호를 확인해요"
                  value={form.password2}
                  onChange={onChange}
              />
              <button type="button" className="su-icon-btn" onClick={togglePw2}>
                👁
              </button>
            </div>
          </label>

        </section>

        <div className="su-helper-links">
          <span onClick={() => navigate("/findid")} className="link">ID 찾기</span>
          &nbsp;/&nbsp;
          <span onClick={() => navigate("/findpassword")} className="link">비밀번호 찾기</span>
        </div>
      </LoginPage>
  );
};

export default Signup;
