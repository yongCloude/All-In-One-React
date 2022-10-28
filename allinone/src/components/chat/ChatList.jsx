import React, { useState } from 'react';
import '../../styles/ChatList.scss';


const ChatList = ({ messages, onClick, onChange, comment }) => {
  return (
    <div className='ChatList'>
      <header>채팅방</header>
      <div className='Chats'>
        {messages.map((message) => (
          <div>
            <ChatItem message={message} key={message.chat_id}/>
          </div>
        ))}
      </div>
      <footer>
        <input type='text' value={comment} onChange={onChange} />
        <button onClick={onClick}>입력</button>
      </footer>
    </div>
  );
};

const ChatItem = ({ message, onClickModal }) => {

  const [year, month, day, time, min] = message.timestamp;

  if (!message) return null;

  return (
    <div className='ChatItem'>
      <div id='user_name' onClick={onClickModal}>{message.user_name}</div>
      <div className='ItemWrapper'>
        <div id='item'>
          {message.content}
        </div>
        <span id='time'>{time}시{min}분</span>
      </div>
    </div>
  );
};

export default ChatList;
