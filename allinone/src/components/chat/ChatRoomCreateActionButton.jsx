import React, { useState } from 'react';
import Button from '../../common/Button';
import AskChatRoomCreateModal from './AskChatRoomCreateModal';


const ChatRoomCreateActionButton = ({onChange, createRoom}) => {
    const [modal, setModal] = useState(false);

    const onCancel = () => {
        setModal(false);
    }
    
    const onConfirm = () => {
        setModal(false);
        createRoom();
    }

    const onCreateClick = () => {
        setModal(true);
        
    }
    
    
    
    return (
        <div className='ChatRoomCreateActionButton'>
            <Button onClick={onCreateClick} cyan={true}>채팅방 개설하기</Button>
            <AskChatRoomCreateModal
                onChange={onChange}
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
                />
        </div>
    );
};

export default ChatRoomCreateActionButton;