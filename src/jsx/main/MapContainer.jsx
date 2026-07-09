import React, { useCallback, useEffect, useRef, useState } from 'react';
import ParkingApi from '../../api/Parking/Parking';
import '../../css/main/Main.css';

const DEFAULT_CENTER = { lat: 37.6256, lng: 127.0729 };
const DEFAULT_LEVEL = 5;
const SEARCH_LEVEL = 4;

const getParkingList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.parkings)) return payload.parkings;
  return [];
};

const getLatLng = (parking) => {
  const lat = parking.latitude ?? parking.lat ?? parking.y;
  const lng = parking.longitude ?? parking.lng ?? parking.x;
  if (lat === undefined || lng === undefined) return null;
  return { lat: Number(lat), lng: Number(lng) };
};

const getRemain = (parking) => {
  return parking.remainParking ?? parking.remainparking ?? parking.availableSpaces ?? parking.availableCount ?? parking.remainCount;
};

const getTotal = (parking) => {
  return parking.totalParking ?? parking.totalparking ?? parking.totalSpaces ?? parking.capacity ?? parking.totalCount;
};

const getStatus = (parking) => {
  if (parking.status) return parking.status;

  const remain = Number(getRemain(parking));
  const total = Number(getTotal(parking));
  if (!Number.isFinite(remain) || !Number.isFinite(total) || total <= 0) return 'UNKNOWN';

  const ratio = remain / total;
  if (ratio >= 0.35) return 'AVAILABLE';
  if (ratio >= 0.1) return 'NORMAL';
  return 'BUSY';
};

const getMarkerColor = (status) => {
  const normalized = String(status).toUpperCase();
  if (['AVAILABLE', 'FREE', 'LOW'].includes(normalized)) return '#22a06b';
  if (['NORMAL', 'MEDIUM'].includes(normalized)) return '#e6a700';
  if (['BUSY', 'FULL', 'HIGH'].includes(normalized)) return '#d64545';
  return '#64748b';
};

const normalizeParking = (parking) => {
  const remainParking = getRemain(parking);
  const totalParking = getTotal(parking);

  return {
    ...parking,
    id: parking.id ?? parking.parkingId ?? parking.pk ?? parking.name,
    name: parking.name ?? parking.parkingName ?? parking.prkplceNm ?? 'Unnamed parking lot',
    address: parking.address ?? parking.roadAddress ?? parking.addr ?? parking.rdnmadr ?? parking.lnmadr ?? 'No address',
    status: getStatus(parking),
    remainParking: remainParking ?? '-',
    totalParking: totalParking ?? '-',
    fee: parking.fee ?? parking.parkingFee ?? parking.basicCharge ?? parking.price ?? 'No fee info',
  };
};

export default function MapContainer({ setSelectedParking }) {
  const mapNodeRef = useRef(null);
  const mapRef = useRef(null);
  const currentMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const parkingMarkersRef = useRef([]);
  const [message, setMessage] = useState('Loading map...');
  const [keyword, setKeyword] = useState('');
  const [destination, setDestination] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const clearParkingMarkers = useCallback(() => {
    parkingMarkersRef.current.forEach((marker) => marker.setMap(null));
    parkingMarkersRef.current = [];
  }, []);

  const addParkingMarkers = useCallback((kakao, map, parkings) => {
    parkings.forEach((rawParking) => {
      const position = getLatLng(rawParking);
      if (!position || Number.isNaN(position.lat) || Number.isNaN(position.lng)) return;

      const parking = normalizeParking(rawParking);
      const markerButton = document.createElement('button');
      markerButton.type = 'button';
      markerButton.className = 'kakao-parking-marker';
      markerButton.style.background = getMarkerColor(parking.status);
      markerButton.textContent = 'P';
      markerButton.setAttribute('aria-label', parking.name);
      markerButton.addEventListener('click', () => setSelectedParking(parking));

      const marker = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(position.lat, position.lng),
        yAnchor: 1,
        content: markerButton,
      });

      marker.setMap(map);
      parkingMarkersRef.current.push(marker);
    });
  }, [setSelectedParking]);

  const loadParkings = useCallback(async (kakao, map, center) => {
    clearParkingMarkers();

    try {
      const payload = await ParkingApi.getNearbyParkings({
        lat: center.getLat(),
        lng: center.getLng(),
      });
      const parkings = getParkingList(payload);

      addParkingMarkers(kakao, map, parkings);
      setMessage(parkings.length > 0 ? '' : 'No parking data to display.');
    } catch (error) {
      console.error('Failed to load parking data:', error);
      setMessage('Parking API is not connected yet. Showing map only.');
    }
  }, [addParkingMarkers, clearParkingMarkers]);

  const setDestinationMarker = (kakao, map, center, title) => {
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.setMap(null);
    }

    destinationMarkerRef.current = new kakao.maps.Marker({
      position: center,
      map,
      title,
    });
  };

  const moveToDestination = (place) => {
    const kakao = window.kakao;
    const map = mapRef.current;
    if (!kakao?.maps || !map) return;

    const center = new kakao.maps.LatLng(Number(place.y), Number(place.x));
    map.setCenter(center);
    map.setLevel(SEARCH_LEVEL);
    setDestinationMarker(kakao, map, center, place.place_name);
    setDestination({
      name: place.place_name,
      address: place.road_address_name || place.address_name || '',
    });
    setSelectedParking(null);
    setMessage('Loading parking lots near destination...');
    loadParkings(kakao, map, center);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = keyword.trim();
    if (!query) {
      setMessage('Enter a destination first.');
      return;
    }

    const kakao = window.kakao;
    if (!kakao?.maps?.services) {
      setMessage('Kakao place search is not ready yet.');
      return;
    }

    setIsSearching(true);
    setMessage('Searching destination...');

    const places = new kakao.maps.services.Places();
    places.keywordSearch(query, (results, status) => {
      setIsSearching(false);

      if (status !== kakao.maps.services.Status.OK || !results?.length) {
        setMessage('No destination found. Try another keyword.');
        return;
      }

      moveToDestination(results[0]);
    });
  };

  useEffect(() => {
    let cancelled = false;

    const addCurrentLocationMarker = (kakao, map, center) => {
      if (currentMarkerRef.current) {
        currentMarkerRef.current.setMap(null);
      }

      currentMarkerRef.current = new kakao.maps.Marker({
        position: center,
        map,
        title: 'Current location',
      });
    };

    const initMap = (centerPoint = DEFAULT_CENTER) => {
      if (cancelled || !mapNodeRef.current || !window.kakao?.maps) return;

      const kakao = window.kakao;
      const center = new kakao.maps.LatLng(centerPoint.lat, centerPoint.lng);
      const map = new kakao.maps.Map(mapNodeRef.current, {
        center,
        level: DEFAULT_LEVEL,
      });

      mapRef.current = map;
      addCurrentLocationMarker(kakao, map, center);
      loadParkings(kakao, map, center);
    };

    const bootKakaoMap = (centerPoint) => {
      if (!window.kakao?.maps) {
        setMessage('Kakao Maps SDK failed to load.');
        return;
      }

      window.kakao.maps.load(() => initMap(centerPoint));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          bootKakaoMap({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => bootKakaoMap(DEFAULT_CENTER),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 },
      );
    } else {
      bootKakaoMap(DEFAULT_CENTER);
    }

    return () => {
      cancelled = true;
      clearParkingMarkers();
      if (currentMarkerRef.current) currentMarkerRef.current.setMap(null);
      if (destinationMarkerRef.current) destinationMarkerRef.current.setMap(null);
    };
  }, [clearParkingMarkers, loadParkings]);

  return (
    <main className="map-container">
      <section className="map-panel" aria-label="parking map">
        <form className="destination-search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search destination"
            aria-label="Destination"
          />
          <button type="submit" disabled={isSearching}>
            {isSearching ? '...' : 'Search'}
          </button>
        </form>

        {destination && (
          <div className="destination-chip">
            <strong>{destination.name}</strong>
            {destination.address && <span>{destination.address}</span>}
          </div>
        )}

        <div ref={mapNodeRef} className="kakao-map" />
        {message && <div className="map-status-message">{message}</div>}
      </section>
    </main>
  );
}