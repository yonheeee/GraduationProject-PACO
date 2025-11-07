import React, { useState } from "react";
import Header from "../common/Header.jsx";
import "../../css/main/Main.css";

const Main = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const locationName = "노원구 공릉동";
  const updatedAt = "2025년 10월 14일 09:00 기준";
  const weather = {
    condition: "쾌청",
    min: 24,
    max: 31,
    message: "밀도가 낮네요.\n일단 주차 준비하셔도 좋아요.",
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearchRoute = () => {
    if (!from || !to) {
      alert("출발지와 도착지를 모두 입력해주세요.");
      return;
    }
    alert(`[더미] "${from}" → "${to}" 경로 기반 주차장 검색 실행`);
  };

  return (
    <div className="main-container">
      {/* 상단 공통 헤더 */}
      <Header />

      {/* 지도 영역 */}
      <div className="main-map">
        <div className="main-map-legend">
          숫자: 주차장 수 / 색: 혼잡도 (실제 정보 아님). 확대 시 상세 보기 가능
        </div>
      </div>

      {/* 하단 시트 */}
      <div className="main-sheet">
        <section className="main-section">
          <h2 className="main-title">어디로 갈까요?</h2>

          <div className="main-inputs">
            <div className="main-input-row">
              <input
                type="text"
                placeholder="출발지를 입력하세요"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="main-input-row">
              <input
                type="text"
                placeholder="도착지를 입력하세요"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <button
                type="button"
                className="main-swap-btn"
                onClick={handleSwap}
                aria-label="출발지와 도착지 바꾸기"
              >
                ↕
              </button>
            </div>
            <button
              type="button"
              className="main-route-btn"
              onClick={handleSearchRoute}
            >
              주차장 찾기
            </button>
          </div>
        </section>

        {/* 날씨 정보 */}
        <section className="main-section">
          <div className="main-weather-card">
            <div className="main-weather-header">
              <div>
                <div className="main-weather-location">{locationName}</div>
                <div className="main-weather-time">{updatedAt}</div>
              </div>
              <div className="main-weather-badge">파란불 감지</div>
            </div>

            <div className="main-weather-body">
              <div className="main-weather-temp">
                <div className="main-weather-label">{weather.condition}</div>
                <div className="main-weather-values">
                  <span className="min">{weather.min}°</span>
                  <span className="max">{weather.max}°</span>
                </div>
              </div>
              <p className="main-weather-msg">{weather.message}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
