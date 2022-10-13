import React from 'react';
import { Link } from '../../../node_modules/react-router-dom/index';


const ChatRoom = ({rooms, error}) => {
    
    
    if(error){
        return <div>에러가 발생했습니다.</div>
    }

    return (
        <div className='ChatRoom'>
            {rooms && (
                <div>
                    {rooms.map(room => (
                        <RoomItem room={room} key={room.channel_id}/>
                    ))}
                </div>
            )}
        </div>
    );
};


const RoomItem = ({room}) => {
    const { ch_title, number_of_users, created_date, channel_id} = room
    const [year, month, day, time, min] = created_date;
    return (
        <div className="RoomItem">
            <h2>
                <Link to={`/chat/${channel_id}`}>{ch_title}</Link>
            </h2>
            <div>
                사용자수{number_of_users}명
            </div>
            <span>{month}월{day}일</span>
        </div>
    )
}

export default ChatRoom;