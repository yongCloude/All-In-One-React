import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChatRoomContainer from '../../containers/chat/ChatRoomContainer';


const ChatRoomPage = () => {
  return (
    <div className='ChatRoomPage'>
      <HeaderContainer />
      <div className='m-auto mt-lg-5' style={{width: 600}}>
        <ChatRoomContainer />
      </div>

    </div>
  );
};

export default ChatRoomPage;