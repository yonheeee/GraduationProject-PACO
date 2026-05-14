import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../api/User/User';
import '../../css/mypage/Mypage.css'; // 스타일 공유

const General = () => {
    const navigate = useNavigate();

    // 1. 로그아웃 로직
    const handleLogout = async () => {
        if (!window.confirm("정말 로그아웃 하시겠습니까?")) return;

        try {
            await UserApi.logout();
        } catch (error) {
            console.error("로그아웃 API 오류 (무시하고 진행):", error);
        } finally {
            // 성공하든 실패하든 클라이언트 처리는 수행
            localStorage.removeItem('accessToken');
            alert("로그아웃 되었습니다.");
            navigate('/signin');
        }
    };

    // 2. 회원 탈퇴 로직
    const handleWithdraw = async () => {
        const password = window.prompt("탈퇴를 위해 비밀번호를 입력해주세요.");
        if (!password) return; // 취소 버튼 누름

        try {
            await UserApi.withdraw(password);
            localStorage.removeItem('accessToken');
            alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
            navigate('/'); // 랜딩 페이지로 이동
        } catch (error) {
            console.error("탈퇴 실패:", error);
            alert(error.response?.data?.message || "비밀번호가 일치하지 않거나 탈퇴에 실패했습니다.");
        }
    };

    return (
        <div className="general-menu-container">
            <ul className="menu-list">
                {/* 통합된 프로필 수정 페이지로 이동 */}
                <li className="menu-item" onClick={() => navigate('/profile/edit')}>
                    <span className="menu-text">회원 정보 수정</span>
                    <span className="arrow">{'>'}</span>
                </li>

                {/* 구분선 */}
                <li className="menu-divider"></li>

                {/* 로그아웃 */}
                <li className="menu-item" onClick={handleLogout}>
                    <span className="menu-text">로그아웃</span>
                    <span className="arrow">{'>'}</span>
                </li>

                {/* 회원 탈퇴 (붉은색 강조) */}
                <li className="menu-item danger" onClick={handleWithdraw}>
                    <span className="menu-text danger-text">탈퇴하기</span>
                    <span className="arrow">{'>'}</span>
                </li>
            </ul>
        </div>
    );
};

export default General;