

import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/common/HeaderContainer';
import MyChatRoomListContainer from '../../containers/chat/MyChatRoomListContainer';
import '../../styles/MyChatListPage.scss'

const MyChatListPage = () => {
    return (
        <div className='MyChatListPage'>
            <HeaderContainer/>
            <Responsive>
                <MyChatRoomListContainer/>
            </Responsive>    
        </div>
    );
};

export default MyChatListPage;
