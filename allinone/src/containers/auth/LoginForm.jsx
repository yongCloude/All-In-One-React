

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';

const LoginForm = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        auth: auth.user,
        authError: auth.authError,
        
    }));

    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;

        dispatch(
            changeField({
                form:'login',
                key: name,
                value
            })
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {email, password} = form;
        dispatch(login({email, password}));
    };

    useEffect(()=>{
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(()=>{
        console.log(auth);
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            return;
        }
        if(auth){
            console.log('로그인 성공');
            navigate('/');
            try{
                localStorage.setItem('user', JSON.stringify(auth));
            } catch(e){
                console.log('local storage is not working');
            }
        }

    },[auth, authError, dispatch, navigate]);




    
    return (
        <AuthForm
            type='login'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default LoginForm;