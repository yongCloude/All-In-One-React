import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/common/HeaderContainer';
import PostViewerContainer from '../../containers/post/PostViewerContainer';
import CommentEditContainer from '../../containers/write/CommentEditContainer';
import CommentWriteActionButtonContainer from '../../containers/write/CommentWriteActionButtonContainer';

const PostViewPage = () => {
  return (
    <div>
      <HeaderContainer />
      <PostViewerContainer />
      <Responsive>
        <CommentEditContainer />
        <CommentWriteActionButtonContainer />
      </Responsive>
    </div>
  );
};

export default PostViewPage;
