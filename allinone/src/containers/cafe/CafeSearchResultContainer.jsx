import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MapContainer from './MapContainer';
import CafeSearchDetail from '../../components/cafe/CafeSearchDetail';

const CafeSearchResultContainer = () => {
  return (
    <>
      <Routes>
        <Route path='/*' element={<MapContainer/>}/>
        <Route path='detail' element={<CafeSearchDetail/>}/>
      </Routes>
    </>
  );
};

export default CafeSearchResultContainer;