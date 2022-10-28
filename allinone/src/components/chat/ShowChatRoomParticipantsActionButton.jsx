import React, { useState } from 'react';
import Button from '../../common/Button';
import ListModal from '../../common/modal/ListModal';

const ShowChatRoomParticipantsActionButton = ({ participants, onConfirm }) => {
  const [modal, setModal] = useState(false);

  const onCancel = () => {
    setModal(false);
  };

  const onClick = () => {
    setModal(true);
  };


  return (
    <div className='ShowChatRoomParticipantsActionButton'>
      <Button onClick={onClick}>참가자 보기</Button>
      <ListModal visible={modal} title='채팅방 참가자' onCancel={onCancel} participants={participants} onConfirm={onConfirm}/>
    </div>
  );
};

export default ShowChatRoomParticipantsActionButton;