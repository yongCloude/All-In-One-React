import React, { useEffect, useState } from 'react';
import '../styles/Home/HomeContainer.scss';
import PopularCafe from '../components/home/PopularCafe';
import PopularBoard from '../components/home/PopularBoard';
import HotChatRoom from '../components/home/HotChatRoom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { fetchPopularCafe, fetchPopularPost } from '../modules/home/home';
import { loadCategory } from '../modules/cafe/search';

const HomeContainer = () => {

  const dispatch = useDispatch();

  const { cafe, post, categories } = useSelector(
    ({ home, cafeSearch }) => ({
      cafe: home.cafe,
      post: home.post,
      categories: cafeSearch.categories,
    }),
  );

  const [category, setCategory] = useState(0);

  useEffect(() => {
    dispatch(fetchPopularPost());
    dispatch(fetchPopularCafe());
    dispatch(loadCategory());
  }, [dispatch]);

  return (
    <div className={'HomeContainer'}>
      <div className={'PopularCafeContainer'}>
        <div className={'Header'}>
          <div className={'Title'}>
            인기 카페
          </div>
          {categories &&(
            <select onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category, index) =>
                <option value={index}>{category.category_name}</option>)
              }
            </select>
          )}

        </div>
        {cafe && <PopularCafe cafe={cafe[category]} />}

      </div>
      <div className={'ListContainer'}>
        <div className={'PopularBoardContainer'}>
          <div className={'Title'}>
            인기 게시글
          </div>
          {post && <PopularBoard board={post} />}
        </div>
        <div className={'HotChatRoomContainer'}>
          <div className={'Title'}>
            인기 채팅방
          </div>
          <HotChatRoom />
        </div>
      </div>

    </div>
  );
};

export default HomeContainer;