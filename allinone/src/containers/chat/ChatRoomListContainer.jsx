import React from 'react';
import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import ChatRoom from '../../components/chat/ChatRoom';
import ChatRoomCreateActionButton from '../../components/chat/ChatRoomCreateActionButton';
import { getRooms } from '../../modules/chat/room';
import { changeField, createChatRoom, initialize } from '../../modules/chat/create';
import { Button, Stack, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
const ChatRoomListContainer = () => {
  const dispatch = useDispatch();
  const { rooms, error, title, user } = useSelector(({ chat, createRoom, auth, room }) => ({
    rooms: room.rooms,
    error: room.error,
    title: createRoom.title,
    user: auth.user,
  }));

  useEffect(() => {
    dispatch(getRooms({}));
  }, [dispatch]);

  const onClick = () => {
    dispatch(getRooms({ title }));
    initialize();
  };

  const onChange = (e) => {
    dispatch(changeField({
      key: 'title',
      value: e.target.value,
    }));
  };

  const onCreateRoomClick = () => {
    dispatch(createChatRoom({
      token: user.accessToken,
      title,
    }));
    window.location.reload();
  };

  return (
    <div className='mt-lg-5'>
      <Stack direction='horizontal' gap={3}>
        <Form.Control className='me-auto' placeholder='채널 검색' onChange={onChange}/>
        <SearchIcon onClick={onClick}/>
        <div className='vr' />
        <ChatRoomCreateActionButton onChange={onChange} createRoom={onCreateRoomClick} />
      </Stack>
      <Stack gap={3}>
        <div className='bg-light border mt-lg-5 p-2'>
          <ChatRoom rooms={rooms} error={error} />
        </div>
      </Stack>
    </div>
  );
};



export default ChatRoomListContainer;
