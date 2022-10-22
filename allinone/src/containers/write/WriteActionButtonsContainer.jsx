import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { updatePost, writePost } from '../../modules/post/write';
import { useNavigate } from '../../../node_modules/react-router-dom/index';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title, content, post, postError, token, originalPostId } =
    useSelector(({ write, auth }) => ({
      title: write.title,
      content: write.content,
      post: write.post,
      postError: write.postError,
      token: auth.user.accessToken,
      originalPostId: write.originalPostId,
    }));

  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, content, id: originalPostId, token }));
      return;
    }
    
    dispatch(
      writePost({
        title,
        content,
        token,
      }),
    );
    navigate('/posts');
  };


  const onCancel = () => {
    navigate('/posts');
  };

  useEffect(() => {
    if (post) {
      navigate('/posts');
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId}/>;
};

export default WriteActionButtonsContainer;
