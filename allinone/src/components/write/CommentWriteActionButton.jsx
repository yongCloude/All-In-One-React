import React from 'react';
import Button from '../../common/Button';
import '../../styles/CommentWriteActionButton.scss';

const CommentWriteActionButton = ({onPublish}) => {
    return (
        <div className='CommentWriteActionButton'>
            <Button cyan={true} onClick={onPublish}>작성</Button>
        </div>
    );
};

export default CommentWriteActionButton;