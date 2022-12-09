import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const AskConfirmModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          스크랩
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          스크랩 하시겠습니까?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClick}>스크랩 하기</Button>
        <Button onClick={props.onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AskConfirmModal;