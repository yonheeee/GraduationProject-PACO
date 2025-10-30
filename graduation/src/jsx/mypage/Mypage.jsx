import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/mypage/Mypage.css'; 

import FavoriteParkingList from './FavoriteParkingList'; 

const User = {
    nickname: '닉네임',
    userId: 'unknown123_',
};

const Parking = [
    { id: 1, name: '서울시 공영주차장', address: '서울시 강남구 서초대로 11-6', status: '혼잡', remainparking: '45' },
    { id: 2, name: '강남구청 부설주차장', address: '서울시 강남구 학동로 426', status: '여유', remainparking: '120' },
    { id: 3, name: '코엑스 주차장', address: '서울시 강남구 영동대로 513', status: '보통', remainparking: '2200' },
    { id: 4, name: '서초역 환승주차장', address: '서울시 서초구 서초대로 248', status: '혼잡', remainparking: '88' },
];


const MyPage = () => {
    return (
        <div className="my-page-wrapper">
            <header className="user-profile-header">
                <div className="user-info">
                    <p className="nickname">{User.nickname}</p>
                    <p className="user-id">{User.userId}</p>
                </div>
                <div className="user-actions">
                    <button className="btn-logout">로그아웃</button>
                    <button className="btn-withdraw">탈퇴하기</button>
                </div>
            </header>

            <nav className="page-nav">
                <a href="#link">일반</a>
                <a href="#link">내 활동</a>
                <a href="#link" className="active">관심 주차장</a>
                <a href="#link">맞춤 설정</a>
            </nav>

            <main className="content-container">
                <FavoriteParkingList parkingData={Parking} />
            </main>
        </div>
    );
};

export default MyPage;