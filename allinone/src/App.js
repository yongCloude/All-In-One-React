import React from 'react';
import { Route, Routes } from '../node_modules/react-router-dom/index';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ChatListPage from './pages/chat/ChatListPage';
import Home from './pages/Home';
import PostListPage from './pages/Post/PostListPage';
import PostViewPage from './pages/Post/PostViewPage';
import PostWritePage from './pages/Post/PostWritePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/write' element={<PostWritePage/>}/>
        <Route path='/posts' element={<PostListPage/>}/>
        <Route path='/chat' element={<ChatListPage/>}/>
        <Route path='/post/:postId' element={<PostViewPage/>}/>
      </Routes>
    </>
  );
};

export default App;