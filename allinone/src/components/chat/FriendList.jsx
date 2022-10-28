import React from 'react';
import Button from '../../common/Button';
import '../../styles/chat/FriendList.scss';
const FriendList = ({friends, onClickInvite}) => {

  return (
    <div className='FriendList'>
      {friends && (
        <>
          {friends.map(friend => (
            <>
              <div className='ItemWrapper'>
                <Item friend_id={friend.friend_id} user_email={friend.user_email} user_name={friend.user_name}/>
                <Button onClick={()=>onClickInvite(friend.user_name, friend.user_email)}>방 초대</Button>
              </div>

            </>

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