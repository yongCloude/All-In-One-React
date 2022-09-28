import React from 'react';
import '../styles/Responsive.scss';

const Responsive = ({ children, ...rest }) => {
    return (
        <div className='Responsive'>
            {children}
        </div>
    );
};

export default Responsive;  