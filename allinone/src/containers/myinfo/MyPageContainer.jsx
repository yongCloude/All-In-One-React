import React, { useEffect } from 'react';
import FriendList from '../../components/myinfo/FriendList';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../modules/auth/auth';

const MyPageContainer = () => {

  const dispatch = useDispatch();
  const { user, friends } = useSelector(({ auth }) => ({
    user: auth.user,
    friends: auth.friends,
  }));

  useEffect(() => {
    dispatch(getFriends({ token: user.accessToken }));
  }, [dispatch, user]);

  if(!user) return <div>오류</div>;

  return (
    <>
      <FriendList friends={friends}/>
    </>
  );
};

export default MyPageContainer;