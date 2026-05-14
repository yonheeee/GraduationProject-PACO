import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import "../../css/login/FindId.css";
import AuthApi from "../../api/Auth/Auth";

const FindId = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickname: "",
    email: "",
    // code: "",
  });
  

  // const [isCodeSent, setIsCodeSent] = useState(false); // 코드 전송 상태
  // const [correctCode] = useState("123456"); // 실제로는 API

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const sendCode = () => {
  //   if (!form.email.trim()) {
  //     alert("이메일을 입력해주세요.");
  //     return;
  //   }
  //
  //   alert("아이디가 이메일로 전송되었습니다."); // TODO : 토스트메시지
  //   setIsCodeSent(true);
  // };

  const handleSubmit = async () => {
    if (!form.nickname || !form.email) {
      alert("닉네임과 아이디(이메일)을 입력해주세요.");
      return;
    }

    try {
      await AuthApi.findId(form.nickname, form.email);

      alert("입력하신 이메일로 아이디가 전송되었습니다.");
      navigate("/signin");

    } catch (err) {
      console.error(err);
      alert("일치하는 회원 정보를 찾을 수 없습니다.");
    }
  };

  return (
    <LoginPage onButtonClick={handleSubmit} buttonText="확인">
      <div className="find-toggle">
        <button className="active">ID</button>
        <button onClick={() => navigate("/findpassword")}>PW</button>
      </div>
      
      <div className="fi-form">
        <label className="fi-field">
          <span className="fi-label">NICKNAME</span>
          <div className="fi-input-row">
            <input
              className="fi-input"
              type="text"
              name="nickname"
              value={form.nickname}
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

            {/*<button*/}
            {/*  type="button"*/}
            {/*  className="fi-right-btn"*/}
            {/*  // className={`fi-right-btn ${isCodeSent ? "sent" : ""}`}*/}
            {/*  onClick={true} //sendCode*/}
            {/*  style={{ cursor: "default", opacity: 0.5 }}*/}
            {/*  // disabled={!form.email.trim() || isCodeSent}*/}
            {/*>*/}
            {/*  /!*{isCodeSent ? "전송됨" : "코드 전송"}*!/*/}
            {/*  전송됨*/}
            {/*</button>*/}
          </div>
        </label>

        {/*<label className="fi-field">*/}
        {/*  <span className="fi-label">CODE</span>*/}
        {/*  <div className="fi-input-row">*/}
        {/*    <input*/}
        {/*      className="fi-input"*/}
        {/*      type="text"*/}
        {/*      name="code"*/}
        {/*      value={form.code}*/}
        {/*      onChange={onChange}*/}
        {/*      placeholder="이메일로 받은 코드를 입력하세요"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</label>*/}
      </div>
    </LoginPage>
  );
};

export default FindId;
