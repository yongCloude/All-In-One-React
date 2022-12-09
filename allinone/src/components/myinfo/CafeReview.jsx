import React from 'react';
import '../../styles/mypage/CafeReview.scss';
const CafeReview = ({ categories }) => {

  return (
    <div className='CafeReview'>
      <div className='CategorySelectHeader'>
        {categories && categories.map((category) => (
          <div id={'category_item'}>#{category.category_name}</div>
        ))}

      </div>
      <hr/>
    </div>
  );
};

export default CafeReview;