import React, { forwardRef, useRef, useState } from 'react';
import '../../styles/chat/ChatList.scss';
import classNames from 'classnames';


const ChatList = forwardRef(({
                               user_email,
                               messages,
                               onClick,
                               onChange,
                               comment,
                               searchMessage,
                               onChangeSearchMessage,
                               onClickSearchButton,
                             }, ref) => {

  return (
    <div className='ChatList'>
      <div className='Chats'>
        {messages.map((message) => (
          <div ref={(el) => (ref.current[message.chat_id] = el)} id={message.chat_id}>
            <ChatItem user_email={user_email} message={message} key={message.chat_id} />
          </div>
        ))}
      </div>
    </div>
  );
});

const ChatItem = ({ user_email, message, onClickModal }) => {

  const [year, month, day, time, min] = message.timestamp;

  if (!message) return null;

  return (
    <div className={classNames('ChatItem', user_email === message.user_email ? ' Myself' : ' Others')}>
      <div className='ItemWrapper'>
        <div className={'Name'} onClick={onClickModal}>{message.user_name}</div>
        <div className='Contents'>
          {
            message.type == 'image/png' ? (<img src={`data:image/png;base64,${message.content}`} />)
              : (<div id='item'>{message.content}</div>)

          }
          <span id='time'>{time}시{min}분</span>
        </div>

      </div>
    </div>
  );
};

export default ChatList;
