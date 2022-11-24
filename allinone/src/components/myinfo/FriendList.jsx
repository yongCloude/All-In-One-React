import React from 'react';
import '../../styles/mypage/FriendList.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import { Table } from 'react-bootstrap';

const FriendList = ({ friends }) => {

  return (
    <div className='p-3 mt-3'>
      {friends && (
        <>
          <h4>친구목록</h4>
          <hr />
          <Table striped>
            <thead>
            <tr>
              <th>#</th>
              <th>이름</th>
              <th>이메일</th>
            </tr>
            </thead>
            <tbody>
            {friends.map(friend => (
                <tr>
                  <td>{friend.friend_id}</td>
                  <td>{friend.user_name}</td>
                  <td>{friend.user_email}</td>
                </tr>
              ),
            )}
            </tbody>
          </Table>
        </>

      )}
    </div>
  );
};

export default FriendList;



