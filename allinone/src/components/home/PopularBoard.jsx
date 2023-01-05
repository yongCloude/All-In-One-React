import React from 'react';
import '../../styles/Home/PopularBoard.scss';
import { Link } from 'react-router-dom';
const PopularBoard = (props) => {
  const { board } = props;
  return (
    <div className={'PopularBoard'}>
      <ul>
        {board.map((item) =>
          <li key={item.board_id}><BoardItem info={item}/></li>,
        )}
      </ul>
    </div>
  );
};

const BoardItem = ({ info }) => {
  const { title, board_id } = info;
  return (
    <div className={'BoardItem'}>
      <Link to={`/post/${board_id}`} style={{textDecoration: "none", color: "black"}}>{title}</Link>
    </div>
  );
}

export default PopularBoard;