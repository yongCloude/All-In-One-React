import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';


const KakaoMap = ({center, cafes}) => {

  const { lat, lng } = center;

  return (
    <Map
      center={{
        lat,
        lng,
      }}
      style={{
        width: '100vw',
        height: '100vh',
      }}
      level={5}
    >
      {cafes &&
        cafes.map((cafe) => (
          <MapMarker position={{
            lat: cafe.latitude,
            lng: cafe.longitude,
          }} />
        ))}
    </Map>
  );
};

export default KakaoMap;