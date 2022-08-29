import React from 'react';
import { Route, Routes } from '../node_modules/react-router-dom/index';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Home from './pages/Home';
import PostListPage from './pages/Post/PostListPage';
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
        <Route path='/post/:postId' element={<RegisterPage/>}/>
      </Routes>
    </>
  );
};

export default App;