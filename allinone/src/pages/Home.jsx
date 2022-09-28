import React from 'react';
import Header from '../common/Header';
import Responsive from '../common/Responsive';
import HeaderContainer from '../containers/auth/common/HeaderContainer';


const Home = () => {
    return (
        <div className='Home'>
            <HeaderContainer/>
            <Responsive>

            안녕하세요
            </Responsive>
        </div>
    );
};

export default Home;