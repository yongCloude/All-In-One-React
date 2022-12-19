import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import Form from 'react-bootstrap/Form';
import PostList from '../../components/posts/PostList';
import { changeField, initialize, listPosts } from '../../modules/post/posts';
import Pagination from '../../components/posts/Pagination';
import { Button } from 'react-bootstrap';
import Responsive from '../../common/Responsive';
const PostListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [option, setOption] = useState('');

  const dispatch = useDispatch();
  const { posts, error, loading, user, query } = useSelector(
    ({ posts, loading, auth, query }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: auth.user,
      query: posts.query,
    }),
  );

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    dispatch(listPosts({}));
  }, [dispatch]);

  const onSearchInput = (e) => {
    dispatch(
      changeField({
        key: option,
        value: e.target.value,
      }),
    );
  };

  const onClickSearch = () => {
    dispatch(listPosts(query));
    dispatch(initialize());
  };

  if (!posts) return null;

  return (
    <>
      <Responsive>
        <Form.Floating className='mb-3'>
          <Form.Control
            id='floatingInputCustom'
            type='title'
            value={query[option]}
            onChange={onSearchInput}
          />
          <label htmlFor='floatingInputCustom'>게시글 검색</label>
        </Form.Floating>
        <Form.Select
          onChange={(e) => setOption(e.target.value)}
        >
          <option value='all'>전체</option>
          <option value='title'>제목</option>
          <option value='writer'>글쓴이</option>
        </Form.Select>
        <div className='d-grid gap-2 mt-2'>
          <Button variant='secondary' size='md' onClick={onClickSearch}>
            검색
          </Button>
        </div>
        <PostList
          loading={loading}
          error={error}
          posts={currentPosts(posts)}
          showWriteButton={user}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={setCurrentPage}
        />
      </Responsive>

    </>
  );
};

export default PostListContainer;
