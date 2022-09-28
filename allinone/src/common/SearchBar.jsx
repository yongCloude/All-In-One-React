

import React from 'react';
import Select from 'react-select';
import '../styles/SearchBar.scss';
import Button from './Button';
const SearchBar = ({option, onChange, setOption, onClick}) => {
    return (
        <div className='SearchBar'>
            <input value={option} onChange={onChange} name="title"/>
        <Select
          onChange={(e) => setOption(e.value)}
          placeholder="옵션선택"
          options={[
            {
              value: "title",
              label: "title"
            },
            {
              value: "writer",
              label: "writer"
            },
            {
              value: "all",
              label: "all"
            },
          ]}
        />
        <Button onClick={onClick}>검색</Button>
        
        </div>
    );
};

export default SearchBar;