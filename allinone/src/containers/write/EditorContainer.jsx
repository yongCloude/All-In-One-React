import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import Editor from '../../components/write/Editor';
import { changeField, initialize } from '../../modules/write';


const EditorContainer = () => {
    const dispatch = useDispatch();
    const {title, content} = useSelector(({write}) => ({
        title: write.title,
        content: write.content,
    }));

    const onChangeField = useCallback(payload => dispatch(changeField(payload)),[
        dispatch,
    ]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);
    return <Editor onChangeField={onChangeField} title={title} content={content}/>
};

export default EditorContainer; 