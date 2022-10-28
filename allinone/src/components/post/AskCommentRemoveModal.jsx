


import React from 'react';
import AskModal from '../../common/modal/AskModal';

const AskCommentRemoveModal = ({visible, onConfirm, onCancel}) => {
    return <AskModal
        visible={visible}
        title= '댓글 삭제'
        description= '댓글을 정말 삭제하시겠습니까?'
        confirmText= '삭제'
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
};

export default AskCommentRemoveModal;