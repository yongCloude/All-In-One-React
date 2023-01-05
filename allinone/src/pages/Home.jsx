import React from 'react';
import Header from '../common/Header';
import Responsive from '../common/Responsive';
import HeaderContainer from '../containers/common/HeaderContainer';
import HomeContainer from '../containers/HomeContainer';


const Home = () => {
  return (
    <div className='Home'>
      <HeaderContainer />
      <HomeContainer />
    </div>
  );
};

export default Home;