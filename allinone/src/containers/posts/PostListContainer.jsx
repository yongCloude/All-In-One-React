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
import SearchBarGroup from '../../components/posts/SearchBarGroup';
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
        <SearchBarGroup onClickSearch={onClickSearch}
                        onSearchInput={onSearchInput}
                        query={query[option]}
                        setOption={setOption} />
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
