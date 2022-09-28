import React from 'react';
import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';
import Header from '../../../common/Header';
import { logout } from '../../../modules/auth';


const HeaderContainer = () => {
    const {user} = useSelector(({auth}) => ({user: auth.user}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    return  <Header user={user} onLogout={onLogout}/>;
        
};

export default HeaderContainer;