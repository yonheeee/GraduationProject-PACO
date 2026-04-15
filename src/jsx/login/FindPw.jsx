import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import "../../css/login/FindId.css"; 

const FindPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    email: "",
    code: "",
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [correctCode] = useState("123456");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendCode = () => {
    if (!form.email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    alert("인증 코드가 이메일로 전송되었습니다.");
    setIsCodeSent(true);
  };

  const handleSubmit = () => {
    if (!form.userId || !form.email || !form.code) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (form.code !== correctCode) {
      alert("인증 코드가 올바르지 않습니다.");
      return;
    }

    alert("인증 완료! 비밀번호 재설정 화면으로 이동합니다.");
    navigate("/reset-password"); 
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
              name="userId"
              value={form.userId}
              onChange={onChange}
              placeholder="아이디를 입력하세요"
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
              className={`fi-right-btn ${isCodeSent ? "sent" : ""}`}
              onClick={sendCode}
              disabled={!form.email.trim() || isCodeSent}
            >
              {isCodeSent ? "전송됨" : "코드 전송"}
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
              value={form.code}
              onChange={onChange}
              placeholder="이메일로 받은 코드를 입력하세요"
            />
          </div>
        </label>
      </div>

    </LoginPage>
  );
};

export default FindPassword;
