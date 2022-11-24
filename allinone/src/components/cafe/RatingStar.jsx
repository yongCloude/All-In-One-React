import React, { useState } from 'react';
import '../../styles/cafe/Star.scss';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RatingStar = () => {

  // 별점 기본값 설정
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  // 더미 배열을 통해 항상 별이 총 5개가 나오도록 한다.
  const array = [0, 1, 2, 3, 4];

  const handleStarClick = index => {

    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    console.log(clickStates);
  };

  return (
    <div className='Stars'>
      <span className='Rating'>
        {array.map((el) => (
          <StarBorderIcon
            key={el}
            onClick={() => handleStarClick(el)}
            className={clicked[el] && 'red'}
            size="30"
          />))}
      </span>

    </div>

  );
};

export default RatingStar;