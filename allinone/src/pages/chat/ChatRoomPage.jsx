import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/auth/common/HeaderContainer';
import ChatRoomContainer from '../../containers/chat/ChatRoomContainer';


const ChatRoomPage = () => {
    return (
        <div className='ChatRoomPage'>
            <HeaderContainer/>
            <Responsive>
                <ChatRoomContainer/>
            </Responsive>
        </div>
    );
};

export default ChatRoomPage;