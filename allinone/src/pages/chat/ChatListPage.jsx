import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/auth/common/HeaderContainer';
import ChatListContainer from '../../containers/chat/ChatListContainer';
import ChatRoomContainer from '../../containers/chat/ChatRoomContainer';
import '../../styles/ChatListPage.scss';

const ChatListPage = () => {
  return (
    <div className="ChatListPage">
        <HeaderContainer />
      <Responsive>
        <ChatListContainer/>
      </Responsive>
    </div>
  );
};

export default ChatListPage;
