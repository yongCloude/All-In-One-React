import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { changeField, initialize, writeComment } from '../../modules/post/write';
import { useParams } from 'react-router-dom';
import CommentWriteActionButton from '../../components/write/CommentWriteActionButton';
import CommentEditor from '../../components/write/CommentEditor';
import '../../styles/post/CommentContainer.scss';

const CommentContainer = () => {

  const dispatch = useDispatch();
  const { postId } = useParams();

  const { comment, user } = useSelector(({ write, auth }) => ({
    comment: write.comment,
    user: auth.user,
  }));

  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);

  const onPublish = () => {

    dispatch(
      writeComment({
        comment,
        board_id: postId,
        token: user.accessToken,
      }),
    );
    window.location.reload();

  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);


  return (
    <div className='CommentContainer'>
      <CommentEditor comment={comment} onChangeField={onChangeField} />
      <CommentWriteActionButton onPublish={onPublish} />
    </div>
  );
};

export default CommentContainer;