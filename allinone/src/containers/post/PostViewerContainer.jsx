import React from 'react';
import { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from '../../../node_modules/react-redux/es/exports';
import {
  useNavigate,
  useParams,
} from '../../../node_modules/react-router-dom/index';
import PostActionButtons from '../../components/posts/PostActionButtons';
import PostViewer from '../../components/posts/PostViewer';
import { removeComment, removePost } from '../../lib/api/posts';
import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';

const PostViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청

  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, auth, write }) => ({
      post: post.post,

      error: post.error,
      loading: loading['post/READ_POST'],
      user: auth.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onRemovePost = async () => {
    try {
      await removePost({id:postId, token: user.accessToken});
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveComment = async (id) => {
    try{
      
      await removeComment({board_id: postId, comment_id: id, token: user.accessToken});
      window.location.reload();
    } catch(e){
      console.log(e);
    }
  }

  const onEditPost = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const ownPost = (user && user.name) === (post && post.b_writer);

  return (
    <PostViewer
      post={post}
      user={user}
      loading={loading}
      error={error}
      postActionButtons={ownPost && <PostActionButtons onEdit={onEditPost} onRemove={onRemovePost} />}
      onRemoveComment={onRemoveComment}
    />
  );
};

export default PostViewerContainer;
