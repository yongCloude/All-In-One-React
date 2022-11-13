import React, { useState } from 'react';
import AskCommentRemoveModal from '../../components/post/AskCommentRemoveModal';
import '../../styles/post/CommentActionButtons.scss';
const CommentActionButtons = ({ id, onEdit, onRemove }) => {

    const [modal, setModal] = useState(false);

    const onRemoveClick = () => {
        setModal(true);
    }

    const onCancel = () => {
        setModal(false);
    }

    const onConfirm = () => {
        setModal(false);
        onRemove(id);
    }
    return (
        <div className='CommentActionButtons'>
            <button onClick={onRemoveClick}>삭제</button>
            <AskCommentRemoveModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </div>
    );
};

export default CommentActionButtons;