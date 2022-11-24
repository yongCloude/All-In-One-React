import React from 'react';

import '../../styles/post/WriteActionButtons.scss';
import { Button } from 'react-bootstrap';

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
    return (
        <div className='WriteActionButtons'>
          <Button variant='info' onClick={onPublish}>포스트 {isEdit ? '수정' : '등록'}</Button>
          <Button variant='dark' onClick={onCancel}>취소</Button>
        </div>
    );
};

export default WriteActionButtons;