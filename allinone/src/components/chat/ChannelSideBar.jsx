import React from 'react';
import Form from 'react-bootstrap/Form';
import '../../styles/chat/ChannelSideBar.scss';
import { Link } from 'react-router-dom';
import ChatRoomCreateActionButton from './ChatRoomCreateActionButton';

const ChannelSideBar = ({ rooms, error , onSubmit,onChange, onCreateRoomClick}) => {
  return (
    <div className='ChannelSideBar'>
      <div className='Header'>
        <div className='Title'>
          <h5>채팅</h5>
          <ChatRoomCreateActionButton onChange={onChange} createRoom={onCreateRoomClick} />
          <Form.Select className='Selector'>
            <option value='1'>모든 채팅방</option>
            <option value='2'>내 채팅방</option>
          </Form.Select>
        </div>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Control  className='Input' onChange={onChange} size='sm' type='text' placeholder='채팅방 검색' />
        </Form>

      </div>
      <div className='ChannelList'>
        {rooms &&
          (
            rooms.map(room => (
              <div>
                <Channel room={room} key={room.channel_id} />
                <hr />
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};


const Channel = ({ room }) => {
  const { ch_title, number_of_users, created_date, channel_id } = room;
  const [year, month, day, time, min] = created_date;
  return (
    <div className='Channel'>
      <Link
        className='Title'
        to={`/chat/${channel_id}`}>
        {ch_title}
      </Link>

      <div className='SubInfo'>
        <h5>
          참여 인원 <span className='Point'>{number_of_users}</span> 명
        </h5>
        <span>{month}월{day}일</span>
      </div>

    </div>
  );
};

export default ChannelSideBar;