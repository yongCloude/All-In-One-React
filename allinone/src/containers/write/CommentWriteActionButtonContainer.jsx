

import React from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useParams } from '../../../node_modules/react-router-dom/index';
import CommentWriteActionButton from '../../components/write/CommentWriteActionButton';
import { writeComment } from '../../modules/write';

const CommentWriteActionButtonContainer = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const {comment, token } = useSelector(({write, auth}) => ({
        comment: write.comment,
        token: auth.user.accessToken,
        
    }));

    const onPublish = () => {
        
        dispatch(
            writeComment({
                comment,
                board_id: postId,
                token,
            }),
        );
        window.location.reload();

    };


    return <CommentWriteActionButton onPublish={onPublish}/>
};

export default CommentWriteActionButtonContainer;