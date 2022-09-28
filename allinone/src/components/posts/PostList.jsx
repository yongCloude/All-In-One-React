import React from 'react';
import { useEffect } from 'react';
import { Link } from '../../../node_modules/react-router-dom/index';
import Button from '../../common/Button';
import Responsive from '../../common/Responsive';
import SubInfo from '../../common/SubInfo';
import '../../styles/PostList.scss';
import sanitize from 'sanitize-html';


const removeHtmlAndShorten = content => {
  const filtered = sanitize(content, {
    allowedTags: [],
  });
  return filtered.length< 200 ? filtered: `${filtered.slice(0,200)}...`;
}

const PostList = ({posts, loading, error, showWriteButton}) => {

  
  // 에러 발생 시
  if(error){
    return <div>에러가 발생했습니다.</div>
  }

  return (
    <Responsive>
      <div className="PostList">
        <div className="WritePostButtonWrapper">
          {showWriteButton && (
            <Button cyan={true} to="/write">새 글 작성하기</Button>
          )}
        </div>
        <div>
        </div>
        {!loading && posts && (
          <div>
            {posts.map(post => (
              <PostItem post={post} key={post.board_id}/>
            ))}
          </div>
        )}
      </div>
    </Responsive>
  );
};

const PostItem = ({ post }) => {
  const { board_id, title, b_writer, b_date, content, likes, views } = post;
  return (
    <div className="PostItem">
      <h2>
        <Link to={`/post/${board_id}`}>{title}</Link>  
      </h2>
      <SubInfo username={b_writer} publishDate={b_date} likes={likes} views={views}/>
      <p>{removeHtmlAndShorten(content)}</p>
    </div>
  );
};

export default PostList;
