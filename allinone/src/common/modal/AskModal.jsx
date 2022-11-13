import React from 'react';
import Button from '../Button';
import '../../styles/modal/AskModal.scss'
const AskModal = ({
    visible,
    title,
    description,
    confirmText= '확인',
    cancelText= '취소',
    onConfirm,
    onCancel,
}) => {
    if(!visible) return null;
  return (
    <div className="FullScreen">
      <div className="AskModal">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="Buttons">
            <Button cyan={true} onClick={onCancel}>{cancelText}</Button>
            <Button cyan={true} onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default AskModal;
