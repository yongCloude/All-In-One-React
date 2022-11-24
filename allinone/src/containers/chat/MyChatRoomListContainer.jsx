

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import ChatRoom from '../../components/chat/ChatRoom';
import { getMyRooms } from '../../modules/chat/room';
import { Form, Stack } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import ChatRoomCreateActionButton from '../../components/chat/ChatRoomCreateActionButton';



const MyChatRoomListContainer = () => {

    const dispatch = useDispatch();
    const { rooms, error, user } = useSelector(({ room, auth }) => ({
        rooms: room.myRooms,
        error: room.error,
        user: auth.user
      }));

    useEffect(() => {
        dispatch(getMyRooms({token: user.accessToken}));
    },[dispatch, user.accessToken])

    return (
      <div className='mt-lg-5'>
          <Stack gap={3}>
              <div className='bg-light border mt-lg-5 p-2'>
                  <ChatRoom rooms={rooms} error={error} />
              </div>
          </Stack>
      </div>
    );
};

export default MyChatRoomListContainer;
