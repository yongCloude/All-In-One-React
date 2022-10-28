import React, { useState } from 'react';
import Button from '../Button';
import '../../styles/AskAddFriendModal.scss';
const AskAddFriendModal = ({
                          visible,
                          title,
                          description,
                          confirmText= '확인',
                          cancelText= '취소',
                          onConfirm,
                          onCancel,
                          user_email,
                          user_name
                        }) => {
  console.log('AskAddFriendModal' + user_name);
  if(!visible) return null;
  return (
    <div className="FullScreen">
      <div className="AskAddFriendModal">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="Buttons">
          <Button cyan={true} onClick={onCancel}>{cancelText}</Button>
          <Button onClick={()=>onConfirm(user_name, user_email)}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default AskAddFriendModal;