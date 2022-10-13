import React from 'react';
import InputModal from '../../common/InputModal';


const AskChatRoomCreateModal = ({visible, onConfirm, onCancel, onChange}) => {
    return <InputModal
        visible={visible}
        title='채팅방 이름'
        onChange={onChange}
        description='채팅방 이름을 입력해주세요.'
        confirmText= '생성'
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
    
};

export default AskChatRoomCreateModal;