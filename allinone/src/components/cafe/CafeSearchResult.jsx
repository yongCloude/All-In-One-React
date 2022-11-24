import React from 'react';
import { Stack } from 'react-bootstrap';
import '../../styles/cafe/CafeSearchResult.scss';
import ShowStars from './ShowStars';

const CafeSearchResult = () => {
  return (
    <>
      <Stack gap={4} className='mt-4'>
        <CafeSearchResultItem />
        <CafeSearchResultItem />
        <CafeSearchResultItem />
        <CafeSearchResultItem />
        <CafeSearchResultItem />
      </Stack>
    </>
  );
};


const CafeSearchResultItem = () => {
  return (
    <div className='CafeSearchResultItem'>
        <div className='Info'>
          <span id='cafe-name'>스타벅스 마곡나인스퀘어점</span>
          <span className='SubInfo'>
            <div id='rating'>3.2<ShowStars score={3}/></div>
            <div id='category'>
              <p>#데이트</p>
            </div>
          </span>
        </div>
      <div id='detail'>
          상세보기
        </div>
    </div>
  );
};

export default CafeSearchResult;