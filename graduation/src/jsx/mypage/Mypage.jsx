import React, { useState } from 'react';
import '../../css/mypage/Mypage.css';

import General from './General';
import MyActivity from './MyActivity';
import FavoriteParkingList from './FavoriteParkingList';
import Setting from './Setting';

const User = {
    nickname: '닉네임',
    userId: 'unknown123_',
};
const Parking = [
    { id: 1, name: '서울시 공영주차장', 
        address: '서울시 강남구 서초대로 11-6', 
        status: '혼잡', 
        remainparking: '45' },
];

const MyPage = () => {
    const [activeTab, setActiveTab] = useState('favorites');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <General />;
            case 'activity':
                return <MyActivity />;
            case 'favorites':
               
                return <FavoriteParkingList parkingData={Parking} />;
            case 'settings':
                return <Setting />;
            default:
                return <FavoriteParkingList parkingData={Parking} />;
        }
    };

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
                <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? 'active' : ''}>일반</button>
                <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'active' : ''}>내 활동</button>
                <button onClick={() => setActiveTab('favorites')} className={activeTab === 'favorites' ? 'active' : ''}>관심 주차장</button>
                <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>맞춤 설정</button>
            </nav>

            <main className="content-container">
                {renderTabContent()}
            </main>
        </div>
    );
};

export default MyPage;