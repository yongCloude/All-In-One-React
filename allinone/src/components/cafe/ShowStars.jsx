import React, { useEffect, useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import '../../styles/cafe/Star.scss'

const ShowStars = ({score=0}) => {

  // 별점 기본값 설정
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  // 더미 배열을 통해 항상 별이 총 5개가 나오도록 한다.
  const array = [0, 1, 2, 3, 4];

  useEffect(() => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i < score ? true : false;
    }
    setClicked(clickStates);

  }, [score]);

  return (
    <div className='Stars'>
      {array.map((el) => (
        <StarBorderIcon
          key={el}
          className={clicked[el] && 'red'}
          fontSize="24"
        />))}
    </div>

  );
};

export default ShowStars;