import React from 'react';
import { Form, Stack } from 'react-bootstrap';

const CafeSearchSelector = () => {
  return (
    <div className='SelectorWrapper'>
      <Stack gap={3} className='RegionSelector'>
        <p id='region-title'>지역 선택</p>
        <Form.Select id="selector">
          <option>시</option>
        </Form.Select>
        <Form.Select id="selector">
          <option>군/구</option>
        </Form.Select>
      </Stack>
      <Stack gap={3} className='CategorySelector'>
        <p id='category-title'>카테고리 선택</p>
        <Form.Select id="selector">
          <option>카테고리</option>
        </Form.Select>
      </Stack>
    </div>
  );
};

export default CafeSearchSelector;