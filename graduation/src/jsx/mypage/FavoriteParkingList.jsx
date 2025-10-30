import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as HeartIcon } from '../../images/mypage/heart.svg';
import '../../css/mypage/FavoriteParkingList.css';

const FavoriteParkingList = ({ parkingData }) => {
    const navigate = useNavigate();

    const handleCardClick = (parkingId) => {
        navigate(`/parking-details/${parkingId}`);
    };
    
    if (!parkingData || parkingData.length === 0) {
        return <div className="no-favorites-message">관심 주차장 목록이 비어있습니다.</div>;
    }

    return (
        <div className="parking-list-container">
            {parkingData.map( (lot) => (
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