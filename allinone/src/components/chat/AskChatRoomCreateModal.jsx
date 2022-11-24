import React, { useState } from 'react';
import InputModal from '../../common/modal/InputModal';
import { Button, Form, Modal } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';


const AskChatRoomCreateModal = ({show, handleShow, handleClose, onConfirm,onChange}) => {

    return (
      <>
          <AddIcon onClick={handleShow}/>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>채팅방 생성</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group className="mb-3" controlId="chatListPage.createChatRoom.inputTitle" onChange={onChange}>
                          <Form.Label>채팅방 이름</Form.Label>
                          <Form.Control
                            type="title"
                            placeholder="방 이름을 입력해주세요"
                            autoFocus
                          />
                      </Form.Group>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      닫기
                  </Button>
                  <Button variant="primary" onClick={onConfirm}>
                      생성
                  </Button>
              </Modal.Footer>
          </Modal>
      </>
    )









    // return <InputModal
    //     visible={visible}
    //     title='채팅방 이름'
    //     onChange={onChange}
    //     description='채팅방 이름을 입력해주세요.'
    //     confirmText= '생성'
    //     onConfirm={onConfirm}
    //     onCancel={onCancel}
    //     />
    
};

export default AskChatRoomCreateModal;