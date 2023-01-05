import React from 'react';
import '../../styles/Home/PopularCafe.scss';
import { Link } from 'react-router-dom';
const PopularCafe = ({ cafe }) => {
  const { cafe_list } = cafe;
  return (
    <div className={'PopularCafe'}>
      {cafe_list.map((cafe) => (
        <CafeItem info={cafe}/>
      ))}
    </div>
  );
};

const CafeItem = ({info}) => {

  const { cafe_name, cafe_id } = info;

  return (
    <div className={'CafeItem'}>
      <Link to={`/cafe/detail/${cafe_id}`} style={{textDecoration: "none", color: "black"}}>{cafe_name}</Link>

    </div>
  )
}

export default PopularCafe;