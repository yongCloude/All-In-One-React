import React from 'react';
import { Link } from '../../../node_modules/react-router-dom/index';
import { Stack } from 'react-bootstrap';


const ChatRoom = ({ rooms, error }) => {


  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <Stack gap={3}>
      {rooms &&
        (
          rooms.map(room => (
            <div>
              <RoomItem room={room} key={room.channel_id} />
              <hr/>
            </div>
          ))
        )

      }
    </Stack>
  );
};


const RoomItem = ({ room }) => {
  const { ch_title, number_of_users, created_date, channel_id } = room;
  const [year, month, day, time, min] = created_date;
  return (
    <div className='RoomItem'>
      <div className='d-flex justify-content-start'>
        <h2 className='me-2'>
          <Link to={`/chat/${channel_id}`} style={{textDecoration: "none", color: "#4FA4AF"}}>{ch_title}</Link>
        </h2>
        <h5>
          {number_of_users}
        </h5>
      </div>
      <span>{month}월{day}일</span>
    </div>
  );
};

export default ChatRoom;