import React, { useState } from 'react';
import AskChatRoomCreateModal from './AskChatRoomCreateModal';

const ChatRoomCreateActionButton = ({onChange, createRoom}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onConfirm = () => {
        setShow(false);
        createRoom();
    }
    
    return (
        <div className='ChatRoomCreateActionButton'>
            <AskChatRoomCreateModal
                onChange={onChange}
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
                onConfirm={onConfirm}
                />
        </div>
    );
};

export default ChatRoomCreateActionButton;