

import React from 'react';
import { useState } from 'react';
import '../../styles/PostActionButtons.scss'
import AskRemoveModal from '../post/AskRemoveModal';

const PostActionButtons = ({ onEdit, onRemove }) => {
    
    const [modal, setModal] = useState(false);

    const onRemoveClick = () => {
        setModal(true);
    }

    const onCancel = () => {
        setModal(false);
    }

    const onConfirm = () => {
        setModal(false);
        onRemove();
    }

    return (
        <div className='PostActionButtons'>
            <button onClick={onEdit}>수정</button>
            <button onClick={onRemoveClick}>삭제</button>
            <AskRemoveModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </div>
    );
};

export default PostActionButtons;