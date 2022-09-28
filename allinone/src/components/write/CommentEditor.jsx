import React from 'react';
import '../../styles/CommentEditor.scss';
const CommentEditor = ({ comment, onChangeField }) => {
  const onChange = (e) => {
    onChangeField({ key: 'comment', value: e.target.value });
  };

  return (
    
      <div className="CommentEditor">
        <input
          type="text"
          onChange={onChange}
          value={comment}
          placeholder="댓글을 입력하세요"
        />
      </div>
    
  );
};

export default CommentEditor;
