import React from 'react';
import Responsive from '../../common/Responsive';
import SubInfo from '../../common/SubInfo';
import '../../styles/post/PostViewer.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const PostViewer = ({
                      post,
                      onClickLike,
                      postActionButtons,
                    }) => {


  const { title, content, b_writer, b_date, likes, views } = post;

  return (
    <div className='PostViewer'>
      <div className='PostHead'>
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
        className='PostContent'
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className='Evaluation' onClick={onClickLike}>
        <ThumbUpIcon></ThumbUpIcon>
        <span>좋아요</span>
      </div>
    </div>


  );
};

export default PostViewer;
