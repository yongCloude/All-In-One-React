import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth/auth';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {form, auth, authError} = useSelector(({ auth }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
    }));

    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;

        dispatch(
            changeField({
                form:'register',
                key: name,
                value
            })
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {email, password, name, birth, gender, phone} = form;
        dispatch(register({email, password, name, birth, gender, phone}));
    };

    useEffect(()=>{
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(authError);
        }
        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            navigate('/login');
        }
        navigate('/login');
    }, [auth, authError, navigate]);

    

    
    return (
        <AuthForm
            type='register'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default RegisterForm;