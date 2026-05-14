import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/mypage/Mypage.css';
import UserApi from '../../api/User/User';
import Footer from '../common/Footer.jsx';
import Header from '../common/Header.jsx';

import General from './General';
import MyActivity from './MyActivity';
import FavoriteParkingList from './FavoriteParkingList';

const MyPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('general');

    const [userInfo, setUserInfo] = useState({
        nickname: '',
        userId: '',
        role: '',
        counts: { // 활동 요약 숫자
            myReviewCount: 0,
            myCommentCount: 0,
            likedReviewCount: 0,
            savedParkingCount: 0
        }
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await UserApi.getMyProfile();
                setUserInfo({
                    nickname: data.username,
                    userId: data.email,
                    role: data.role,
                    counts: {
                        myReviewCount: data.myReviewCount,
                        myCommentCount: data.myCommentCount,
                        likedReviewCount: data.likedReviewCount,
                        savedParkingCount: data.savedParkingCount
                    }
                });
            } catch (error) {
                console.error("프로필 조회 실패:", error);
                if (error.response?.status === 401) {
                    navigate('/signin');
                }
            }
        };
        fetchProfile();
    }, [navigate]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <General />;
            case 'activity':
                return <MyActivity />;
            case 'favorites':
                return <FavoriteParkingList />;
            default:
                return <General />;
        }
    };

    return (
        <div className="my-page-wrapper">
            <Header/>
            <div style={{width: '90%', margin: '5% auto'}}>
                <header className="user-profile-header">
                    <div className="user-info">
                        <p className="nickname">{userInfo.nickname || '사용자'}</p>
                        <p className="user-id">{userInfo.userId || '정보를 불러오는 중...'}</p>
                    </div>
                </header>

                <nav className="page-nav">
                    <button onClick={() => setActiveTab('general')}
                            className={activeTab === 'general' ? 'active' : ''}>일반
                    </button>
                    <button onClick={() => setActiveTab('activity')}
                            className={activeTab === 'activity' ? 'active' : ''}>내 활동
                    </button>
                    <button onClick={() => setActiveTab('favorites')}
                            className={activeTab === 'favorites' ? 'active' : ''}>관심 주차장
                    </button>
                </nav>

                <main className="content-container">
                    {renderTabContent()}
                </main>
            </div>
            <Footer/>
        </div>
    );
};

export default MyPage;