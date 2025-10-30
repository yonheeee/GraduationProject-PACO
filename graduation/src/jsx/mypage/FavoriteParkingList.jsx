import React from 'react';
import { useNavigate } from 'react-router-dom';

// CSS는 부모인 MyPage.css를 그대로 사용하므로 별도로 import할 필요는 없습니다.
// 만약 다른 곳에서도 이 컴포넌트를 쓴다면 CSS import 구문을 추가해주세요.
// import '../../css/mypage/Mypage.css'; 

// SVG 아이콘 import
import { ReactComponent as HeartIcon } from '../../images/mypage/heart.svg';

/**
 * '관심 주차장' 목록을 렌더링하는 자식 컴포넌트입니다.
 * @param {object} props - 부모 컴포넌트로부터 전달받은 props
 * @param {Array<object>} props.parkingData - 주차장 정보가 담긴 배열
 */
const FavoriteParkingList = ({ parkingData }) => {
    // 페이지 이동을 위한 navigate 함수
    const navigate = useNavigate();

    const handleCardClick = (parkingId) => {
        navigate(`/parking-details/${parkingId}`);
    };

    // 만약 전달받은 데이터가 없거나 비어있을 경우를 대비한 처리
    if (!parkingData || parkingData.length === 0) {
        return <div className="no-favorites-message">관심 주차장 목록이 비어있습니다.</div>;
    }

    return (
        <div className="parking-list-container">
            {/* 부모로부터 전달받은 parkingData 배열을 map 함수로 순회합니다. */}
            {parkingData.map((lot) => (
                // 각 아이템의 최상위 태그에는 고유한 key prop을 반드시 추가해야 합니다.
                <div 
                    key={lot.id} 
                    className="parking-card" 
                    onClick={() => handleCardClick(lot.id)}
                >
                    <div className="parking-info">
                        <div className="parking-name-status">
                            <h2 className="parking-name">{lot.name}</h2>
                            {/* status 값에 따라 동적으로 className을 부여합니다. */}
                            <span className={`parking-status ${
                                lot.status === '혼잡' ? 'congested' : 
                                lot.status === '여유' ? 'available' : 'normal'
                            }`}>
                                [{lot.status}]
                            </span>
                        </div>
                        <p className="parking-address">{lot.address}</p>
                        <p className="parking-remaining">
                            현재 잔여 : 총 {lot.remainparking}석
                        </p>
                    </div>

                    <div className="favorite-icon-wrapper">
                        <HeartIcon className="heart-icon" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavoriteParkingList;