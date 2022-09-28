import React from 'react';
import { Link } from '../../../node_modules/react-router-dom/index';
import Button from '../../common/Button';
import '../../styles/AuthForm.scss';

/** 회원가입 또는 로그인 폼을 보여준다. */

const textMap = {
    login: '로그인',
    register: '회원가입',
}


const AuthForm = ({type, form, onChange, onSubmit}) => {
    const text = textMap[type];

    return (
        <div className='AuthForm'>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <input className="StyledInput" onChange={onChange} value={form.email} autoComplete='usename' name='email' type="text" placeholder='이메일'/>
                {type === 'register' && (
                    <>
                        {/* <Button className="StyledInput">인증번호 요청</Button>
                        <input className="StyledInput" name='name' type="text" placeholder='인증번호 입력'/>
                        <Button className="StyledInput">인증번호 확인</Button> */}
                    </>
                )}
                <input className="StyledInput" onChange={onChange} value={form.password} autoComplete='new-password' name='password' type="password" placeholder='비밀번호'/>
                {type === 'register' && (
                    <>
                        <input className="StyledInput" onChange={onChange} value={form.name} name='name' type="text" placeholder='이름'/>
                        <input className="StyledInput" onChange={onChange} value={form.birth} name='birth' type="text" placeholder='생일'/>
                        <input className="StyledInput" onChange={onChange} value={form.gender} name='gender' type="text" placeholder='성별'/>
                        <input className="StyledInput" onChange={onChange} value={form.phone} name='phone' type="text" placeholder='휴대폰 번호'/>
                    </>
                )}
            <Button cyan={true} fullWidth={true} marginTop={true}>
                    {text}
            </Button>
                
            </form>
            
            
            <div className="Footer">
                {type === 'login' ? (
                    <Link to='/register'>회원가입</Link>
                ) : (
                    <Link to='/login'>로그인</Link>
                )}
               
            </div>
            
            
        </div>
    );
};

export default AuthForm;