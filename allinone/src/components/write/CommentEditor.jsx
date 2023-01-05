import React from 'react';
import Form from 'react-bootstrap/Form';
import '../../styles/post/CommentEditor.scss';

const CommentEditor = ({ comment, onChangeField }) => {

  return (

    <div className='CommentEditor'>
      <Form>
        <Form.Group
          value={comment}
          onChange={(e) => onChangeField({ key: 'comment', value: e.target.value })}>
          <Form.Control
            className='Input'
            as='textarea' rows={3} />
        </Form.Group>
      </Form>
    </div>

  );


};

export default CommentEditor;
