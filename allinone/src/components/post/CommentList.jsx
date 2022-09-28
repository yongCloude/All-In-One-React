import React from 'react';
import '../../styles/CommentList.scss';
import CommentActionButtons from '../posts/CommentActionButtons';
const CommentList = ({username, commentList, onRemoveComment}) => {
    return (
        <div className='CommentList'>
            {commentList && (
                <div>
                    {commentList.map(comment => (
                        <Comment username={username} commentItem={comment} onRemoveComment={onRemoveComment} key={comment.comment_id} id={comment.comment_id}/>
                    ))}
                </div>
            )}
        </div>
    );
};


const Comment = ({username, commentItem, onRemoveComment, id}) => {
    const { c_writer, c_date, comment } = commentItem; 
    const options = { timeZone: "UTC"};
    return (
        <div className="Comment">
            <header>
                <span>{c_writer}</span>
                {username === c_writer && <CommentActionButtons onRemove={() => onRemoveComment(id)}/>}
                
            </header>
            <p>{comment}</p>
            <footer>{new Date(c_date).toLocaleDateString()}{new Date(c_date).toLocaleTimeString(options)}</footer>
        </div>
    )
}

export default CommentList;