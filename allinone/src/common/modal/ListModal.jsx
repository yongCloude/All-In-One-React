import React from 'react';
import Button from '../Button';
import '../../styles/ListModal.scss';
const ListModal = ({ visible, title, onCancel, participants, onConfirm }) => {

  if (!visible) return null;
  return (
    <div className='FullScreen'>
      <div className='ListModal'>
        <h1>{title}</h1>
        <hr/>
        {participants && participants.map(participant => (
          <>
            <h2 key={participant.user_id}>{participant.user_name}</h2>
            <Button cyan={true} onClick={() => onConfirm(participant.user_name, participant.user_email)}>친구 추가</Button>
          </>


        ))}
        <hr/>
        <Button onClick={onCancel}>나가기</Button>
      </div>


    </div>
  );
};

export default ListModal;