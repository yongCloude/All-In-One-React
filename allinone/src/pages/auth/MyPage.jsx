import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import MyPageContainer from '../../containers/myinfo/MyPageContainer';
import MyPageTemplate from './MyPageTemplate';

const MyPage = () => {
  return (
    <div className="MyPage">
      <HeaderContainer/>
      <MyPageTemplate>
        <MyPageContainer/>
      </MyPageTemplate>
    </div>

  );
};

export default MyPage;