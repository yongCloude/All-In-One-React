import React from 'react';
import '../styles/chat/ChatHeader.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import FriendInviteModal from './modal/FriendInviteModal';
import SearchIcon from '@mui/icons-material/Search';

const ChatHeader = ({ roomTitle, participants, onChangeSearchMessage, onClickSearchButton, invitalbe, addableFriends,onClickInvite }) => {
  const [modalShow, setModalShow] = React.useState(false);

  const addable = addableFriends();

  console.log(invitalbe());

  return (
    <div className='ChatHeader'>
      <div className='Title'>
        방제목
      </div>
      <div className='Functions'>
        <NavDropdown title='참가자' id='navbarScrollingDropdown'>
          {participants.map(participant => (
            <NavDropdown.Item>
              {participant.user_name}
              {addable == participant.user_name && <Button className="ms-2" size="sm">친구추가</Button>}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <Nav.Link title='친구 초대' onClick={() => setModalShow(true)}>
          친구 초대
        </Nav.Link>
        <Form className='d-flex' onChange={(e)=> onChangeSearchMessage(e.target.value)}>
          <Form.Control
            type='search'
            placeholder='Search'
            className='me-2'
            aria-label='Search'
          />
          <SearchIcon onClick={onClickSearchButton}/>
        </Form>
      </div>
      <FriendInviteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        invitable={() => invitalbe}
        onClickInvite={() => onClickInvite}
      />
    </div>
  );


  /*return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand href='#'>방 제목</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown title='참가자' id='navbarScrollingDropdown'>
                {participants.map(participant => (
                  <NavDropdown.Item>
                    {participant.user_name}
                    {addable == participant.user_name && <Button className="ms-2" size="sm">친구추가</Button>}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link title='친구 초대' onClick={() => setModalShow(true)}>
                친구 초대
              </Nav.Link>
            </Nav>
            <Form className='d-flex' onChange={(e)=> onChangeSearchMessage(e.target.value)}>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
              <Button variant='outline-success' onClick={onClickSearchButton}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FriendInviteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        invitable={() => invitalbe}
        onClickInvite={() => onClickInvite}
      />
    </>

  );*/
};

export default ChatHeader;