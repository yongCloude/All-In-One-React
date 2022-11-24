import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import '../../styles/mypage/MyPage.scss';

import MyPageContainer from '../../containers/myinfo/MyPageContainer';

function MyPage() {
  return (
    <>
      <HeaderContainer/>
      <MyPageContainer/>
    </>
  );
}

export default MyPage;

