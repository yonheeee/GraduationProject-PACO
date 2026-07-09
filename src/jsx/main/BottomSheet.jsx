import React from 'react';
import '../../css/main/Main.css';

const formatSpaces = (parking) => {
  const remain = parking.remainParking ?? parking.remainparking ?? '-';
  const total = parking.totalParking ?? parking.totalparking ?? '-';
  return `${remain} / ${total}`;
};

export default function BottomSheet({ parking, onClose }) {
  if (!parking) return null;

  return (
    <aside className="bottom-sheet">
      <button type="button" className="sheet-close" onClick={onClose} aria-label="닫기">
        x
      </button>
      <h2>{parking.name ?? parking.parkingName ?? '이름 없는 주차장'}</h2>
      <p className="sheet-address">{parking.address ?? parking.roadAddress ?? parking.addr ?? '주소 정보 없음'}</p>
      <dl className="parking-summary">
        <div>
          <dt>혼잡도</dt>
          <dd>{parking.status ?? '정보 없음'}</dd>
        </div>
        <div>
          <dt>잔여 좌석</dt>
          <dd>{formatSpaces(parking)}</dd>
        </div>
        <div>
          <dt>요금</dt>
          <dd>{parking.fee ?? parking.parkingFee ?? parking.basicCharge ?? '요금 정보 없음'}</dd>
        </div>
      </dl>
      <button type="button" className="route-button">길찾기</button>
    </aside>
  );
}