

import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import CommentEditor from '../../components/write/CommentEditor';
import { changeField, initialize } from '../../modules/post/write';

const CommentEditContainer = () => {
    const dispatch = useDispatch();
    const { comment } = useSelector(({write}) => ({
        comment: write.comment
    }));

    const onChangeField = useCallback(payload => dispatch(changeField(payload)),[
        dispatch,
    ]);



    return <CommentEditor comment={comment} onChangeField={onChangeField}/>
};

export default CommentEditContainer;