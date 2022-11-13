import React from 'react';
import Button from '../../common/Button';
import '../../styles/post/WriteActionButtons.scss';

const WriteActionButtons = ({ onCancel, onPublish, isEdit }) => {
    return (
        <div className='WriteActionButtons'>
            <Button cyan={true} onClick={onPublish}>포스트 {isEdit ? '수정' : '등록'}</Button>
            <Button onClick={onCancel}>취소</Button>
        </div>
    );
};

export default WriteActionButtons;