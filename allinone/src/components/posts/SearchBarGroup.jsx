import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/post/SearchBarGroup.scss';
import React from 'react';


const SearchBarGroup = ({ query, onSearchInput, onClickSearch, setOption }) => {
  return (
    <div className='SearchBarGroup'>
        <Form.Select
          className='Selector'
          onChange={(e) => setOption(e.target.value)}
        >
          <option value='all'>전체</option>
          <option value='title'>제목</option>
          <option value='writer'>글쓴이</option>
        </Form.Select>
        <Form.Control
          className='Input'
          placeholder='게시글 검색'
          aria-label="Recipient's username with two button addons"
          value={query}
          onChange={onSearchInput}
        />
        <Button
          className='Button'
          variant='secondary'
          onClick={onClickSearch}>
          검색
        </Button>

    </div>
  );
};

export default SearchBarGroup;