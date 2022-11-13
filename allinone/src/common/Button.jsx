import React from 'react';

import '../styles/common/Button.scss';
import classNames from 'classnames';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import { RangeStatic } from 'quill';


const Button = ({to, children, cyan, fullWidth, marginTop, ...rest}) => {
    
    const navigate = useNavigate();

    const onClick = e => {
        if(to){
            navigate(to);
        }
        if(rest.onClick){
            rest.onClick(e);
        }

    }

    return (
        <button onClick={onClick} className={classNames('Button', {cyan: cyan}, {fullWidth: fullWidth}, {marginTop: marginTop})}>
            {children}
        </button>
    );
};

export default Button;

