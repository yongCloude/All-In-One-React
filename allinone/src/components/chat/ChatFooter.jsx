import React from 'react';
import '../../styles/chat/ChatFooter.scss';
import { InputGroup, Form, Button } from 'react-bootstrap';
const ChatFooter = ({onSubmit, onChange,onClickExit}) => {
  return (
    <div className='ChatFooter'>
      <form onSubmit={(e) => onSubmit(e)}>
        <input onChange={onChange}/>
      </form>
      <button onClick={onClickExit}>나가기</button>
    </div>
  );
};

export default ChatFooter;