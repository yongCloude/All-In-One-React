import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header({ user, onLogout }) {

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>AllInOne</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/cafe-map'>자기야 카페갈래?</Nav.Link>
            <Nav.Link href='/posts'>게시판</Nav.Link>
            <NavDropdown title='채팅' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='/chat'>모든 채팅방</NavDropdown.Item>
              {user && (<NavDropdown.Item href='/mychat'>내가 만든 채팅방</NavDropdown.Item>)}
            </NavDropdown>
          </Nav>
          <Nav>
            {user && (<Nav.Link href='/mypage'>마이 페이지</Nav.Link>)}
            {user == null ?
              (<Nav.Link eventKey={2} href='/login'>로그인</Nav.Link>) :
              (<Nav.Link eventKey={2} onClick={onLogout}>로그아웃</Nav.Link>)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;