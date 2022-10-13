

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import ChatRoom from '../../components/chat/ChatRoom';
import { listMyRooms } from '../../modules/chat';


const MyChatListContainer = () => {

    const dispatch = useDispatch();

    const { rooms, error, user } = useSelector(({ chat, wChat, auth }) => ({
        rooms: chat.rooms,
        error: chat.error,
        user: auth.user
      }));

    useEffect(() => {
        console.log(user.accessToken);
        dispatch(listMyRooms({token: user.accessToken}));
    },[dispatch, user.accessToken])

    return (
        <div className='MyChatListContainer'>
            <ChatRoom rooms={rooms} error={error}/>
        </div>
    );
};

export default MyChatListContainer;
