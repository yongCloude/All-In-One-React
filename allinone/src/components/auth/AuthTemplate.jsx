import React from 'react';
import '../../styles/auth/AuthTemplage.scss';
/**
 * 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트
 */

const AuthTemplate = ({ children }) => {
    return (
        <div className='AuthTemplate'>
            <div className="WhiteBox">
                <div id="title">AllInOne</div>
                {children}
            </div>
            
        </div>
    );
};

export default AuthTemplate;