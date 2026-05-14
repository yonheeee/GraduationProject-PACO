import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import "../../css/login/FindId.css";
import AuthApi from "../../api/Auth/Auth"; // API 연결

const FindPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    // code: "",
  });

  // const [isCodeSent, setIsCodeSent] = useState(false);
  // const [correctCode] = useState("123456");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /*
  const sendCode = () => {
    if (!form.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    alert("인증 코드가 이메일로 전송되었습니다.");
    setIsCodeSent(true);
  };
  */

  const handleSubmit = async () => {
    if (!form.username || !form.email) {
      alert("닉네임과 아이디(이메일)을 입력해주세요.");
      return;
    }

    /*
    if (form.code !== correctCode) {
      alert("인증 코드가 올바르지 않습니다.");
      return;
    }
    */

    try {
      await AuthApi.findPassword(form.username, form.email);

      alert("이메일로 임시 비밀번호가 전송되었습니다.\n로그인 후 비밀번호를 변경해주세요.");
      navigate("/signin");

    } catch (err) {
      console.error(err);
      alert("일치하는 회원 정보를 찾을 수 없습니다.");
    }
  };

  return (
      <LoginPage onButtonClick={handleSubmit} buttonText="확인">

        <div className="find-toggle">
          <button onClick={() => navigate("/findid")}>ID</button>
          <button className="active">PW</button>
        </div>

        <div className="fi-form">

          <label className="fi-field">
            <span className="fi-label">아이디</span>
            <div className="fi-input-row">
              <input
                  className="fi-input"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  placeholder="닉네임을 입력하세요"
              />
            </div>
          </label>

          <label className="fi-field">
            <span className="fi-label">E-MAIL</span>
            <div className="fi-input-row">
              <input
                  className="fi-input"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="가입 시 사용한 이메일을 입력하세요"
              />

              <button
                  type="button"
                  className="fi-right-btn"
                  disabled={true}
                  style={{ cursor: "default", opacity: 0.5 }}
              >
                전송됨
              </button>
            </div>
          </label>

          <label className="fi-field">
            <span className="fi-label">CODE</span>
            <div className="fi-input-row">
              <input
                  className="fi-input"
                  type="text"
                  name="code"
                  // value={form.code}
                  disabled={true} // 입력 불가 처리
                  placeholder="인증 과정은 생략됩니다 (바로 확인을 눌러주세요)"
              />
            </div>
          </label>
        </div>

      </LoginPage>
  );
};

export default FindPassword;