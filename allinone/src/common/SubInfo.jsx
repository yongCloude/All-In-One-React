import React from 'react';
import '../styles/common/SubInfo.scss';


const SubInfo = ({ username, publishDate, likes, views }) => {

  const [ year, month, date ] = publishDate;

  return (
    <div className='SubInfo'>
            <span>
                <b>
                    {username}
                </b>
            </span>
      <span>{year}년 {month}월 {date}일</span>
      <span className='Etc'>
                <span>좋아요 {likes}</span>
                <span>조회수 {views}회</span>
            </span>
    </div>
  );
};

export default SubInfo;