import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HeartIcon } from '../../images/mypage/heart.svg';
import '../../css/mypage/FavoriteParkingList.css';
import UserApi from '../../api/User/User';

const FavoriteParkingList = () => {
    const navigate = useNavigate();
    const [parkingData, setParkingData] = useState([]);

    // [임시] ID 목록은 가져왔지만 상세 정보를 보여주기 위한 더미 데이터
    const DUMMY_DETAILS = [
        { id: 1, name: '서울시 공영주차장 (임시)', address: '상세 정보 API 연결 대기중', status: '혼잡', remainparking: '-' },
        { id: 2, name: '역삼 주차장 (임시)', address: '상세 정보 API 연결 대기중', status: '여유', remainparking: '-' },
    ];

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                // 1. 저장한 주차장 ID 목록 가져오기 (예: [1, 2])
                const likedIds = await UserApi.getSavedParkingIds();
                console.log("찜한 주차장 IDs:", likedIds);

                if (likedIds && likedIds.length > 0) {
                    // ID 개수만큼 더미 데이터를 생성하거나 매핑해서 보여줌
                    // (실제로는 여기서 ID별 상세조회 API를 호출해야 함)
                    const mappedData = likedIds.map(id => ({
                        ...DUMMY_DETAILS[0], // 임시 데이터 복사
                        id: id,
                        name: `주차장 (ID: ${id})` // ID 확인용
                    }));
                    setParkingData(mappedData);
                } else {
                    setParkingData([]);
                }

            } catch (error) {
                console.error("관심 주차장 조회 실패:", error);
            }
        };
        fetchLikes();
    // DUMMY_DETAILS is static placeholder data until the parking detail API is connected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCardClick = (parkingId) => {
        // 상세 페이지 이동 (보류 상태라도 이동은 가능하게)
        navigate(`/parking-details/${parkingId}`);
    };

    if (!parkingData || parkingData.length === 0) {
        return <div className="no-favorites-message" style={{textAlign:'center', padding:'2rem', color:'#888'}}>관심 주차장 목록이 비어있습니다.</div>;
    }

    return (
        <div className="parking-list-container">
            {parkingData.map((lot) => (
                <div
                    key={lot.id}
                    className="parking-card"
                    onClick={() => handleCardClick(lot.id)}
                >
                    <div className="parking-info">
                        <div className="parking-name-status">
                            <h2 className="parking-name">{lot.name}</h2>
                            <span className={`parking-status ${
                                lot.status === '혼잡' ? 'congested' :
                                    lot.status === '여유' ? 'available' : 'normal'
                            }`}>
                                [{lot.status}]
                            </span>
                        </div>
                        <p className="parking-address">{lot.address}</p>
                        <p className="parking-remaining">
                            🅿️ 현재 잔여 : 총 {lot.remainparking}석
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