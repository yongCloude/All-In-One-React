import React from 'react';
import '../../styles/FriendList.scss';
const FriendList = ({friends}) => {

  return (
    <div className='FriendList'>
      {friends && (
        <>
          {friends.map(friend => (
              <Item friend_id={friend.friend_id} user_email={friend.user_email} user_name={friend.user_name}/>
            )
          )}
        </>
      )}
    </div>
  );
};

const Item = ({ friend_id, user_email, user_name }) => {

  return(
    <div className='Item'>
      {friend_id}
      {user_email}
      {user_name}
    </div>
  )
};

export default FriendList;