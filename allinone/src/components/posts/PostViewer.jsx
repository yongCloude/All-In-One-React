import React from 'react';
import Responsive from '../../common/Responsive';
import SubInfo from '../../common/SubInfo';
import '../../styles/PostViewer.scss';
import CommentList from '../post/CommentList';

const PostViewer = ({
  post,
  error,
  loading,
  postActionButtons,
  onRemoveComment,
  user,
}) => {
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

  const { title, content, b_writer, b_date, likes, views, commentList } = post;

  return (
    <Responsive>
      <div className="PostViewer">
        <div className="PostHead">
          <h1>{title}</h1>
          <SubInfo
            username={b_writer}
            publishDate={b_date}
            likes={likes}
            views={views}
          />
        </div>
        {postActionButtons}
        <div
          className="PostContent"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <CommentList
        username={user.name}
        commentList={commentList}
        onRemoveComment={onRemoveComment}
      />
      
      
    </Responsive>
  );
};

export default PostViewer;
