import React from 'react';
import { Stack } from 'react-bootstrap';

const MyInfo = ({ user }) => {

  const { name, email, gender, birth, phoneNumber } = user;


  return (
    <Stack gap={4}>
      <hr />
      <div className='d-flex flex-column justify-content-start'>
        <p className='p-2'>이름: {name}</p>
        <p className='p-2'>이메일: {email}</p>
        <p className='p-2'>전화번호: {phoneNumber}</p>
      </div>
      <hr />
      <div className='d-flex flex-column justify-content-start'>
        <p className='p-2'>생년월일: {birth}</p>
        <p className='p-2'>성별: {gender}</p>
      </div>
      <hr />
    </Stack>
  );
};

export default MyInfo;