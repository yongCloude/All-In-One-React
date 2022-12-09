import React, { useEffect } from 'react';
import '../../styles/cafe/CafeSearchDetail.scss';
import { Button, InputGroup, Stack, Form } from 'react-bootstrap';
import ShowStars from './ShowStars';
import RatingStar from './RatingStar';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadCafeDetail } from '../../modules/cafe/detail';

const CafeSearchDetail = ({
                            detail,
                            categories,
                            categoryActive,
                            onChange,
                            onClickSubmit,
                            onClickStar,
                            onClickDelete,
                            toggleActive,
                            onToggleModal,
                          }) => {

  const dispatch = useDispatch();
  const { cafe_id } = useParams();


  useEffect(() => {
    dispatch(loadCafeDetail({ cafe_id }));
  }, [dispatch]);


  if (!detail) return null;

  return (
    <div className='CafeSearchDetail'>
      <header>
        <div className='InfoAndButtons'>
          <div id='info'>
            <h4>{detail.cafe_name} {detail.cafe_branch}</h4>
            <p>{detail.road_addr}</p>
          </div>
          <div id='buttons'>
            <Button id='button' size='sm' onClick={onToggleModal}>스크랩</Button>
            <Button id='button' size='sm'>평가하기</Button>
          </div>
        </div>
        <div id='category'>
          <h2>#{detail.category_1}</h2>
          <h2>#{detail.category_2}</h2>
          <h2>#{detail.category_3}</h2>
        </div>
      </header>
      <div className='Review'>
        <Stack gap={1}>
          <SelectCategory categories={categories} toggleActive={toggleActive} categoryActive={categoryActive} />
          <WriteReview cafe_id={cafe_id}
                       onChange={onChange}
                       onClickSubmit={onClickSubmit}
                       onClickStar={onClickStar}
          />
          <ReviewList
            cafe_id={cafe_id}
            total_rating={detail.total_rating}
            reviews={detail.reviews}
            onClickDelete={onClickDelete} />
        </Stack>

      </div>

    </div>
  );
};


const SelectCategory = ({ categories, toggleActive, categoryActive }) => {

  if (!categories) return null;

  return (
    <div className='Box'>
      <div id='category-list'>
        {categories.map((category, index) => (
          <button key={index} value={category.category_name} onClick={(e) => toggleActive(e)}
                  className={'btn' + (categoryActive.find(name => name == category.category_name) ? ' active' : '')}>
            #{category.category_name}
          </button>
        ))}
      </div>
    </div>
  );
};

const WriteReview = ({ cafe_id, onChange, onClickSubmit, onClickStar }) => {
  return (
    <div className='Box'>
      <div className='Header'>
        <p>리뷰 작성</p>
        <RatingStar onClick={onClickStar} />
      </div>
      <InputGroup className='mt-2'>
        <Form.Control
          as='textarea'
          name='content'
          onChange={(e) => onChange(e)}
          placeholder='댓글 작성'
          aria-label="Recipient's username"
          aria-describedby='basic-addon2'
        />
        <Button variant='outline-secondary' id='button-addon2' onClick={() => onClickSubmit(cafe_id)}>
          작성
        </Button>
      </InputGroup>
    </div>
  );
};

const ReviewList = ({ cafe_id, total_rating, reviews, onClickDelete }) => {
  return (
    <>
      <div className='Box'>
        <div className='ReviewList'>
          <h5>전체 평점</h5>
          <p>{total_rating}점</p>
          {reviews.length != 0 && reviews.map((review) => (
            <ReviewItem key={review.index}
                        cafe_id={cafe_id}
                        review_id={review.review_id}
                        user_name={review.user_name}
                        content={review.content}
                        rating={review.star_rating}
                        onClickDelete={onClickDelete} />
          ))}
        </div>
      </div>
    </>
  );
};


const ReviewItem = ({ cafe_id, review_id, user_name, content, rating, onClickDelete }) => {
  return (
    <div className='ReviewItem'>
      <div id='reviewer-name'>{user_name}</div>
      <div className='review-content-wrapper'>
        <div id='rating'>
          {rating}<ShowStars score={rating} />
        </div>
        <div id='comment'>{content}</div>
      </div>
      <div className='action-buttons-wrapper'>
        <Button id='button'>수정</Button>
        <Button id='button' onClick={() => onClickDelete(cafe_id, review_id)}>삭제</Button>
      </div>
    </div>
  );
};

export default CafeSearchDetail;