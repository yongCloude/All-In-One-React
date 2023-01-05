import React from 'react';
import { Route, Routes } from '../node_modules/react-router-dom/index';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import Home from './pages/Home';
import PostListPage from './pages/Post/PostListPage';
import PostViewPage from './pages/Post/PostViewPage';
import PostWritePage from './pages/Post/PostWritePage';
import MyPage from './pages/auth/MyPage';
import CafeMainPage from './pages/cafe/CafeMainPage';
import CafeDetailPage from './pages/cafe/CafeDetailPage';
import ChatRoomPage from './pages/chat/ChatRoomPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/write' element={<PostWritePage />} />
        <Route path='/posts' element={<PostListPage />} />
        <Route path='/chat/*' element={<ChatRoomPage />} />
        <Route path='/cafe' element={<CafeMainPage />} />
        <Route path='/cafe/detail/:cafe_id' element={<CafeDetailPage />} />
        <Route path='/mypage/*' element={<MyPage />}></Route>
        <Route path='/post/:postId' element={<PostViewPage />} />
      </Routes>
    </>
  );
};

export default App;