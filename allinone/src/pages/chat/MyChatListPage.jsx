

import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/common/HeaderContainer';
import MyChatListContainer from '../../containers/chat/MyChatListContainer';
import '../../styles/MyChatListPage.scss'

const MyChatListPage = () => {
    return (
        <div className='MyChatListPage'>
            <HeaderContainer/>
            <Responsive>
                <MyChatListContainer/>
            </Responsive>    
        </div>
    );
};

export default MyChatListPage;
