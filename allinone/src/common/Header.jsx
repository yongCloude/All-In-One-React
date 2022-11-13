import React from 'react';
import Button from './Button';
import '../styles/common/Header.scss';
import Responsive from './Responsive';
import { useNavigate } from '../../node_modules/react-router-dom/index';

const Header = ({user, onLogout}) => {

  const navigate = useNavigate();


  return (
    <div>
      <div className="Header">
        <Responsive>
          <div className="Wrapper">
            <div id="logo" onClick={()=>navigate('/')}>AllInOne</div>
            <div id="center">
                <Button to="/posts">게시판</Button>
                <Button to="/chat">채팅</Button>
                {user && <Button to="/mychat">나의 채팅방</Button>}
                {user && <Button to="/mypage">마이 페이지</Button>}
                
            </div>
            {user ? (
              <div id="right">
                <div className="UserInfo">{user.name}</div>  
                <Button onClick={onLogout}>로그아웃</Button>
              </div>
            ) : (
              <div id="right">  
              <Button to="/login">로그인</Button>
            </div>
            )}
            
          </div>
        </Responsive>
      </div>
      <Spacer />
    </div>
  );
};

const Spacer = () => {
  return <div className="Spacer"></div>;
};

export default Header;
