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
import {getRooms} from '../../modules/chat/room';
import { changeField, createChatRoom, initialize } from '../../modules/chat/create';


const ChatRoomListContainer = () => {
  const dispatch = useDispatch();
  const { rooms, error, title, user } = useSelector(({ chat, createRoom, auth, room }) => ({
    rooms: room.rooms,
    error: room.error,
    title: createRoom.title,
    user: auth.user
  }));

  useEffect(() => {
    dispatch(getRooms({}));
  }, [dispatch]);

  const onClick = () => {
    dispatch(getRooms({title}));
    initialize();
  }

  const onChange = (e) => {
    dispatch(changeField({
      key: 'title',
      value: e.target.value
    }));
  }

  const onCreateRoomClick = () => {
    dispatch(createChatRoom({
        token: user.accessToken,
        title
    }));
    window.location.reload();
  }

  return (
    <>
      <ChatRoomCreateActionButton onChange={onChange} createRoom={onCreateRoomClick}/>
      <SearchBar onClick={onClick} onChange={onChange}/>
      <ChatRoom rooms={rooms} error={error} />
    </>
  );
};

export default ChatRoomListContainer;
