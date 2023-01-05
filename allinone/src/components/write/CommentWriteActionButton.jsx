import React from 'react';

import '../../styles/post/CommentWriteActionButton.scss';
import { Button } from 'react-bootstrap';

const CommentWriteActionButton = ({ onPublish }) => {
  return (
    <div className='CommentWriteActionButton'>
      <Button
        className='Button'
        onClick={onPublish}>작성</Button
      >
    </div>
  );
};

export default CommentWriteActionButton;