

import React from 'react';
import '../styles/common/SearchBar.scss';
import Button from './Button';
const SearchBar = ({option, onChange, onClick}) => {
    return (
        <div className='SearchBar'>
            <input value={option} onChange={onChange} name="title"/>
        
        <Button onClick={onClick}>검색</Button>
        
        </div>
    );
};

export default SearchBar;