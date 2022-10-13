import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import SearchBar from '../../common/SearchBar';
import ChatRoom from '../../components/chat/ChatRoom';
import ChatRoomCreateActionButton from '../../components/chat/ChatRoomCreateActionButton';
import { listRooms } from '../../modules/chat';
import { changeField, createRoom } from '../../modules/chat_write';

const ChatListContainer = () => {
  const dispatch = useDispatch();
  const [roomTitle, setRoomTitle] = useState('');
  
  const { rooms, error, ch_title, user } = useSelector(({ chat, wChat, auth }) => ({
    rooms: chat.rooms,
    error: chat.error,
    ch_title: wChat.roomTitle,
    user: auth.user
  }));

  useEffect(() => {
    dispatch(listRooms({}));
  }, [dispatch]);

  const onClick = () => {
    dispatch(listRooms({title:roomTitle}));
    setRoomTitle('');
  }

  const onChange = (e) => {
    setRoomTitle(e.target.value);
  }

  const onCreateRoom = (e) => {
    dispatch(changeField({
        key: 'roomTitle',
        value: e.target.value
    }));
  }

  const onCreateRoomClick = () => {
    dispatch(createRoom({
        token: user.accessToken,
        roomTitle: ch_title,
    }));
  }

  

  return (
    <>
      <ChatRoomCreateActionButton onChange={onCreateRoom} createRoom={onCreateRoomClick}/>
      <SearchBar onClick={onClick} onChange={onChange}/>
      <ChatRoom rooms={rooms} error={error} />
    </>
  );
};

export default ChatListContainer;
