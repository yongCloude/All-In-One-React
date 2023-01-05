import React, { useState } from 'react';
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
import { fetchPost, likePost, unLikePost, unloadPost } from '../../modules/post/post';
import { setOriginalPost } from '../../modules/post/write';
import CommentList from '../../components/post/CommentList';

const PostViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청

  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, error, loading, user, like } = useSelector(
    ({ post, loading, auth, write }) => ({
      post: post.post,
      error: post.error,
      like: post.like,
      loading: loading['post/READ_POST'],
      user: auth.user,
    }),
  );

  useEffect(() => {
    dispatch(fetchPost(postId, user?.accessToken));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);


  const onClickLike = () => {

    if (!like) {
      dispatch(likePost(postId, user.accessToken));
    } else {
      dispatch(unLikePost(postId, user.accessToken));
    }
    dispatch(unLikePost(postId, user.accessToken));
  }

  const onRemovePost = async () => {
    try {
      await removePost({id:postId, token: user.accessToken});
      navigate('/posts');
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
    console.log(post);
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const ownPost = (user && user.name) === (post && post.b_writer);

  if (error) {
    if (error.response && error.response.status === 404) {
      return <div>존재하지 않는 포스트입니다.</div>;
    }
    return <div>오류 발생!</div>;
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null;
  }
  return (
    <>
      <PostViewer
        post={post}
        user={user}
        loading={loading}
        error={error}
        onClickLike={onClickLike}
        postActionButtons={ownPost && <PostActionButtons onEdit={onEditPost} onRemove={onRemovePost} />}
        onRemoveComment={onRemoveComment}
      />
      <CommentList
        commentList={post.commentList}
        onRemoveComment={onRemoveComment}
      />
    </>
  );
};

export default PostViewerContainer;
