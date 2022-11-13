import React from 'react';
import '../../styles/mypage/MyPageTemplate.scss';

const MyPageTemplate = ({children}) => {


  return (
    <div className='MyPageTemplate'>
      <div className='Info'>
        <div id='title'>마이 페이지</div>
        <hr/>
        {children}
      </div>
    </div>
  );
};

export default MyPageTemplate;