import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';


const FriendInviteModal = (props) => {

  console.log(props);
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          친구 초대
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.invitable.length == 0 ? (
            <p>
              초대 가능한 친구가 없습니다.
            </p>
          ) :
          (
            <>
              {props.invitable.map(user_name => (
                <ListGroup horizontal>
                  <ListGroup.Item>user_name</ListGroup.Item>
                  <Button variant='dark' onClick={() => props.onClickInvite}>초대</Button>
                </ListGroup>
              ))}
            </>
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FriendInviteModal;