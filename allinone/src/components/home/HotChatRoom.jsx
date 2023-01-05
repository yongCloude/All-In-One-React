import React from 'react';
import '../../styles/Home/HotChatRoom.scss';
const HotChatRoom = () => {
  return (
    <div className={'HotChatRoom'}>
      <ul>
        <li><ChatRoomItem/></li>
        <li><ChatRoomItem/></li>
        <li><ChatRoomItem/></li>
        <li><ChatRoomItem/></li>
        <li><ChatRoomItem/></li>
      </ul>
    </div>
  );
};

const ChatRoomItem = () => {
  return (
    <div className={'BoardItem'}>
      <p>fd</p>
    </div>
  );
}

export default HotChatRoom;