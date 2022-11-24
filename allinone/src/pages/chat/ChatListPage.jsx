import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ChatRoomListContainer from '../../containers/chat/ChatRoomListContainer';
import '../../styles/chat/ChatListPage.scss';

const ChatListPage = () => {
  return (
    <div className="ChatListPage">
        <HeaderContainer />
      <Responsive>
        <ChatRoomListContainer/>
      </Responsive>
    </div>
  );
};

export default ChatListPage;
