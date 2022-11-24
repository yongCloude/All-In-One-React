import React, { forwardRef, useRef, useState } from 'react';
import '../../styles/chat/ChatList.scss';


const ChatList = forwardRef(({ messages, onClick, onChange, comment, searchMessage, onChangeSearchMessage, onClickSearchButton }, ref) => {

  return (
    <div className='ChatList'>
      <div className='Chats'>
        {messages.map((message) => (
          <div ref={(el) => (ref.current[message.chat_id] = el)} id={message.chat_id}>
            <ChatItem message={message} key={message.chat_id} />
          </div>
        ))}
      </div>
    </div>
  );
});

const ChatItem = ({ message, onClickModal }) => {

  const [year, month, day, time, min] = message.timestamp;

  if (!message) return null;

  return (
    <div className='ChatItem'>
      <div onClick={onClickModal}>{message.user_name}</div>
      <div className='ItemWrapper'>
        {
          message.type == 'image/png' ? (<img src={`data:image/png;base64,${message.content}`} />)
            : (<div id='item'>{message.content}</div>)
        }

        <span id='time'>{time}시{min}분</span>
      </div>
    </div>
  );
};

export default ChatList;
