

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import ChatRoom from '../../components/chat/ChatRoom';
import { getMyRooms } from '../../modules/chat/room';



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
        <div className='MyChatListContainer'>
            <ChatRoom rooms={rooms} error={error}/>
        </div>
    );
};

export default MyChatRoomListContainer;
