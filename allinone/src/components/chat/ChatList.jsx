import React, { forwardRef, useRef, useState } from 'react';
import '../../styles/chat/ChatList.scss';


const ChatList = forwardRef(({ messages, onClick, onChange, comment, searchMessage, onChangeSearchMessage, onClickSearchButton }, ref) => {


  return (
    <div className='ChatList'>
      <header>
        <h2>채팅방</h2>
        <div className='SearchBarWrapper'>
          <input value={searchMessage} onChange={(e)=>onChangeSearchMessage(e.target.value)}/>
          <p onClick={onClickSearchButton}>검색</p>
        </div>
      </header>
      <div className='Chats'>
        {messages.map((message) => (
          <div ref={(el) => (ref.current[message.chat_id] = el)} id={message.chat_id}>
            <ChatItem message={message} key={message.chat_id} />
          </div>
        ))}
      </div>
      <footer>
        <input type='text' value={comment} onChange={onChange} />
        <button onClick={onClick}>입력</button>
      </footer>
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
