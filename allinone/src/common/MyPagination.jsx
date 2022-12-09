import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


const MyPagination = ({ curPage, cafesPerPage, totalLen, paginate }) => {

  let active = curPage;
  let items = [];
  for (let number = 1; number <= Math.ceil(totalLen / cafesPerPage); number++) {
    items.push(
      <Pagination.Item
        className='pagination-item'
        key={number}
        active={number === active}
        onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination className='d-flex justify-content-center mt-4'>
      {items}
    </Pagination>
  );
};

export default MyPagination;