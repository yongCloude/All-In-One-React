import React from 'react';
import { Stack, Form } from 'react-bootstrap';
import '../../styles/cafe/CafeSearchContainer.scss';
import CafeSearchSelector from '../../components/cafe/CafeSearchSelector';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CafeSearchResult from '../../components/cafe/CafeSearchResult';

const CafeSearchContainer = () => {

  const navigate = useNavigate();

  return (
    <div className='CafeSearchContainer'>
      <Form.Control className='CafeSearchInput' onClick={() => navigate('/cafe-map')} size='md' type='text' placeholder='카페명 입력' />
      <Routes>
        <Route path='/' element={<CafeSearchSelector/>}/>
        <Route path='*' element={<CafeSearchResult/>}/>
      </Routes>
    </div>
  );
};

export default CafeSearchContainer;