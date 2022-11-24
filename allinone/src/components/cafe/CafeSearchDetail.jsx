import React from 'react';
import '../../styles/cafe/CafeSearchDetail.scss';
import { Button, InputGroup, Stack, Form } from 'react-bootstrap';
import ShowStars from './ShowStars';
import RatingStar from './RatingStar';

const CafeSearchDetail = () => {
  return (
    <div className='CafeSearchDetail'>
      <header>
        <div className='InfoAndButtons'>
          <div id='info'>
            <h4>스타벅스 마곡나인스퀘어점</h4>
            <p>서울 강서구 마곡중앙5로 47</p>
          </div>
          <div id='buttons'>
            <Button id='button' size='sm'>스크랩</Button>
            <Button id='button' size='sm'>평가하기</Button>
          </div>
        </div>
        <div id='category'>
          <h2>#공부하기 좋은 곳</h2>
          <h2>#데이트</h2>
        </div>
      </header>
      <div className='Review'>
        <Stack gap={1}>
          <SelectCategory />
          <WriteReview />
          <ReviewList />
        </Stack>

      </div>

    </div>
  );
};


const SelectCategory = () => {
  return (
    <div className='Box'>
      <div id='category-list'>
        <span>#category</span>
        <span>#category</span>
        <span>#category</span>
        <span>#category</span>
        <span>#category</span>
        <span>#category</span>
        <span>#category</span>
        <span>#category</span>
      </div>
    </div>
  );
};

const WriteReview = () => {
  return (
    <div className='Box'>
      <div className='Header'>
        <p>리뷰 작성</p>
        <RatingStar/>
      </div>
      <InputGroup className='mt-2'>
        <Form.Control
          as='textarea'
          placeholder='댓글 작성'
          aria-label="Recipient's username"
          aria-describedby='basic-addon2'
        />
        <Button variant='outline-secondary' id='button-addon2'>
          작성
        </Button>
      </InputGroup>
    </div>
  );
};

const ReviewList = () => {
  return (
    <>
      <div className='Box'>
        <div className='ReviewList'>
          <h5>전체 평점</h5>
          <p>3.3점</p>

          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>


      </div>
    </>
  );
};


const ReviewItem = () => {
  return (
    <div className='ReviewItem'>
      <div id='reviewer-name'>구름용</div>
      <div className='review-content-wrapper'>
        <div id='rating'>
          5<ShowStars score={3}/>
        </div>
        <div id='comment'>얼마나 아름다우냐? 이것을 얼음 속에서 불러 내는 것이 따뜻한 봄바람이다.</div>
      </div>
      <div className='action-buttons-wrapper'>
        <Button id='button'>수정</Button>
        <Button id='button'>삭제</Button>
      </div>
    </div>
  );
};

export default CafeSearchDetail;