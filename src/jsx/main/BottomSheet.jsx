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
      <button type="button" className="sheet-close" onClick={onClose} aria-label="Close">
        x
      </button>
      <h2>{parking.name ?? parking.parkingName ?? 'Unnamed parking lot'}</h2>
      <p className="sheet-address">{parking.address ?? parking.roadAddress ?? parking.addr ?? 'No address'}</p>
      <dl className="parking-summary">
        <div>
          <dt>Status</dt>
          <dd>{parking.status ?? 'Unknown'}</dd>
        </div>
        <div>
          <dt>Spaces</dt>
          <dd>{formatSpaces(parking)}</dd>
        </div>
        <div>
          <dt>Fee</dt>
          <dd>{parking.fee ?? parking.parkingFee ?? parking.basicCharge ?? 'No fee info'}</dd>
        </div>
      </dl>
      <button type="button" className="route-button">Route</button>
    </aside>
  );
}