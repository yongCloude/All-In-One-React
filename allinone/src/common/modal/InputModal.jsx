import React from 'react';
import Button from '../Button';
import '../../styles/InputModal.scss';

const InputModal = ({
                      visible,
                      title,
                      description,
                      onChange,
                      onConfirm,
                      onCancel,
                      cancelText = '취소',
                      confirmText = '확인',
                    }) => {
  if (!visible) return null;
  return (
    <div className='FullScreen'>
      <div className='InputModal'>
        <h2>{title}</h2>
        <p>{description}</p>
        <input type='text' onChange={onChange} />
        <div className='Buttons'>
          <Button cyan={false} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button cyan={false} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
