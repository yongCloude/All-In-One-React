import React, { useEffect } from 'react';
import FriendList from '../../components/myinfo/FriendList';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../modules/auth/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/mypage/MyPage.scss';
import MyPageSideMenu from '../../components/myinfo/MyPageSideMenu';
import { Route, Routes } from 'react-router-dom';
import MyInfo from '../../components/myinfo/MyInfo';

const MyPageContainer = () => {

  const dispatch = useDispatch();
  const { user, friends } = useSelector(({ auth }) => ({
    user: auth.user,
    friends: auth.friends,
  }));

  useEffect(() => {
    dispatch(getFriends({ token: user.accessToken }));
  }, [dispatch, user]);

  if (!user) return <div>오류</div>;

  return (
    <Container className='mypage-container'>
      <Row>
        <Col sm={3} className='mypage-sidemenu-container'>
          <MyPageSideMenu user_name={user.name} user_email={user.email}/>
        </Col>
        <Col md={'auto'}>
          <div className='vertical-line'></div>
        </Col>
        <Col sm={8} className='mypage-menu-view-container'>
          <Routes>
            <Route path='myinfo' element={<MyInfo user={user}/>} />
            <Route path='friends' element={<FriendList friends={friends}/>}/>
            <Route path='cafe-review' />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPageContainer;