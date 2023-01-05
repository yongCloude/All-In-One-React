import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Route, Routes } from 'react-router-dom';
import { getRooms } from '../../modules/chat/room';
import '../../styles/chat/ChatContainer.scss';
import ChannelSideBar from '../../components/chat/ChannelSideBar';
import { changeField, createChatRoom, initialize } from '../../modules/chat/create';
import ChatContentsContainer from './ChatContentsContainer';

const ChatContainer = () => {

  const dispatch = useDispatch();

  const { rooms, title, user, messages, message, participants, friends, searchTargetMessage } = useSelector(
    ({ auth, message, wMessage, room, createRoom }) => ({
      user: auth.user,
      messages: message.messages,
      message: wMessage.message,
      searchTargetMessage: message.searchMessage,
      participants: room.participants,
      rooms: room.rooms,
      title: createRoom.title,
      friends: auth.friends,
    }),
  );


  /**
   * 채팅방 불러오기
   */
  useEffect(() => {
    dispatch(getRooms({}));
  }, [dispatch]);

  const onCreateRoomClick = () => {
    dispatch(createChatRoom({
      token: user.accessToken,
      title,
    }));
    // window.location.reload();
  };

  const onSubmit = (e) => {
    dispatch(getRooms({ title }));
    initialize()
    e.preventDefault();
  };

  const onChange = (e) => {
    dispatch(changeField({
      key: 'title',
      value: e.target.value,
    }));
  };

  return (
    <div className='ChatContainer'>
      <ChannelSideBar rooms={rooms} onSubmit={onSubmit} onChange={onChange} onCreateRoomClick={onCreateRoomClick} />
      <Routes>
        <Route path='/:channelId' element={<ChatContentsContainer />} />
      </Routes>

    </div>
  );
};

export default ChatContainer;