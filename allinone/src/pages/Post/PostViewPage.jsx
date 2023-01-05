import React from 'react';
import Responsive from '../../common/Responsive';
import HeaderContainer from '../../containers/common/HeaderContainer';
import PostViewerContainer from '../../containers/post/PostViewerContainer';
import CommentEditContainer from '../../containers/write/CommentEditContainer';
import CommentWriteActionButtonContainer from '../../containers/write/CommentWriteActionButtonContainer';
import CommentContainer from '../../containers/write/CommentContainer';

const PostViewPage = () => {
  return (
    <div>
      <HeaderContainer />
      <Responsive>
        <PostViewerContainer />
        <CommentContainer/>
      </Responsive>
    </div>
  );
};

export default PostViewPage;
