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
import { loadScrap } from '../../modules/cafe/detail';
import CafeReview from '../../components/myinfo/CafeReview';
import { loadCategory } from '../../modules/cafe/search';

const MyPageContainer = () => {

  const dispatch = useDispatch();
  const { user, friends, categories } = useSelector(({ auth, cafeSearch }) => ({
    user: auth.user,
    friends: auth.friends,
    categories: cafeSearch.categories,
  }));

  useEffect(() => {
    dispatch(getFriends({ token: user.accessToken }));
    dispatch(loadScrap({ token: user.accessToken }));
    dispatch(loadCategory());
  }, [dispatch, user]);

  if (!user) return <div>오류</div>;

  return (
    <Container className='mypage-container'>
      <Row>
        <Col className='mypage-sidemenu-container'>
          <MyPageSideMenu user_name={user.name} user_email={user.email} />
        </Col>
        <Col md={'auto'}>
          <div className='vertical-line'></div>
        </Col>
        <Col className='mypage-menu-view-container'>
          <Routes>
            <Route path='myinfo' element={<MyInfo user={user} />} />
            <Route path='friends' element={<FriendList friends={friends} />} />
            <Route path='cafe-review' element={<CafeReview categories={categories}/>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPageContainer;