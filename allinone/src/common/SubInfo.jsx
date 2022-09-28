import React from 'react';
import '../styles/SubInfo.scss';


const SubInfo = ({username, publishDate, likes, views}) => {
    return (
        <div className='SubInfo'>
            <span>
                <b>
                    {username}
                </b>
            </span>
            <span>{new Date(publishDate).toLocaleDateString()}</span>
            <span className="Etc">
                <span>좋아요 {likes}</span>
                <span>조회수 {views}회</span>
            </span>
        </div>
    );
};

export default SubInfo;