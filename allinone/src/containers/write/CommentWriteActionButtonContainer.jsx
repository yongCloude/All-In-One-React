

import React from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useParams } from '../../../node_modules/react-router-dom/index';
import CommentWriteActionButton from '../../components/write/CommentWriteActionButton';
import { writeComment } from '../../modules/post/write';

const CommentWriteActionButtonContainer = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const {comment, user } = useSelector(({write, auth}) => ({
        comment: write.comment,
        user: auth.user,
    }));

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


    return <CommentWriteActionButton onPublish={onPublish}/>
};

export default CommentWriteActionButtonContainer;