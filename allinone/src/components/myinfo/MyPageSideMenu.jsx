import React from 'react';
import { Nav, Stack } from 'react-bootstrap';

const MyPageSideMenu = ({ user_name, user_email }) => {
  return (
    <Stack gap={3} className='MyPageSideMenu'>
      <div className='d-flex flex-column align-items-center mt-5'>
        <h5>{user_name}</h5>
        <h5>{user_email}</h5>
      </div>
      <hr />
      <Nav defaultActiveKey='/mypage' className='flex-column'>
        <Nav.Link href='/mypage/myinfo'><h5>내 정보</h5></Nav.Link>
        <Nav.Link href='/mypage/friends'><h5>친구 정보</h5></Nav.Link>
        <Nav.Link href='/mypage/cafe-review'><h5>카페 리뷰</h5></Nav.Link>
      </Nav>
    </Stack>
  );
};

export default MyPageSideMenu;

