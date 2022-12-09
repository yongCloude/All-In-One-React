import React from 'react';
import '../../styles/cafe/CafeSideBar.scss';
import { Stack, Form } from 'react-bootstrap';
import ShowStars from './ShowStars';
import { useNavigate } from 'react-router-dom';

const CafeSideBar = ({ categories, provinces, cities, onChange, onSubmit, onClickInput, request, cafes }) => {


  return (
    <div className='CafeSideBar'>
      <form onSubmit={(e) => onSubmit(e)}>
        <Form.Control className='CafeSearchInput'
                      onChange={(e) => onChange(e)}
                      onClick={onClickInput}
                      name='cafe' size='md'
                      type='text' placeholder='카페명 입력' />
      </form>
      {cafes == null ?
        (
          <>
            <div className='SelectorWrapper'>
              <Stack gap={4}>
                <p>지역 선택</p>
                <ProvinceSelector selectorName='province' optionName='시' contents={provinces} onChange={onChange} />
                {request['province'] != '' ?
                  <CitySelector selectorName='city' optionName='군/구' contents={cities[request['province']]}
                                onChange={onChange} />
                  : null
                }
                <p>카테고리 선택</p>
                <CategorySelector selectorName='category' optionName='카테고리' contents={categories} onChange={onChange} />
              </Stack>
            </div>
          </>
        )
        :
        (
          <>
            <div className='CafeListWrapper'>
              {cafes.map((cafe) => (
                <CafeItem key={cafe.cafe_id} props={cafe}/>
              ))}

              <div className='Pagination'></div>
            </div>
          </>
        )

      }


    </div>
  );
};

const CafeItem = ({ props }) => {

  const { cafe_id, cafe_name, cafe_branch, total_rating,road_addr, category_1, category_2, category_3 } = props;
  const categories = [category_1, category_2, category_3];

  const navigate = useNavigate();
  return (
    <>
      <div className='CafeListItem'>
        <div id='cafe-info'>
          <div id='name'>
            <span className='fw-bold fs-5'>{cafe_name}</span>
            <span className='fs-5'> {cafe_branch}</span>
          </div>
          <div id='sub'>
            <div id='rate'>{total_rating}<ShowStars /></div>
            <div>{road_addr}</div>
            {categories && categories.map((category, index) => (
              <div id='category'
                   key={index}>#{category}</div>
            ))}

          </div>
        </div>
        <div id='show-detail' onClick={()=>navigate(`/cafe/detail/${cafe_id}`)}>
          상세보기
        </div>
      </div>
    </>
  );
};

const ProvinceSelector = ({ selectorName, optionName, contents, onChange }) => {

  return (
    <>
      <Form.Select id='selector' name={selectorName} onChange={(e) => onChange(e)}>
        <option>{optionName}</option>
        {contents.length != 0 ? contents.map((content, index) => (
          <option key={index}>{content}</option>
        )) : null}
      </Form.Select>
    </>
  );
};

const CitySelector = ({ selectorName, optionName, contents, onChange }) => {
  return (
    <>
      <Form.Select id='selector' name={selectorName} onChange={(e) => onChange(e)}>
        <option>{optionName}</option>
        {Object.keys(contents).length != 0 ? contents && contents.map((content) => (
          <option key={content.region_id}>{content.city}</option>
        )) : null}
      </Form.Select>
    </>
  );
};

const CategorySelector = ({ contents, onChange }) => {

  return (
    <>
      <Form.Select id='selector' name='category' onChange={(e) => onChange(e)}>
        <option>카테고리</option>
        {contents && contents.map((content) => (
          <option key={content.category_cafe_num}>{content.category_name}</option>
        ))}
      </Form.Select>
    </>
  );
};

export default CafeSideBar;