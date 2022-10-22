import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnSuccess } from "../../lib/createRequestSaga";
import * as postAPI from '../../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import post from "./post";

const INITIALIZE = 'write.jsx/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write.jsx/CHANGE_FIELD'; // 특정 key 값 바꾸기
const SET_ORIGINAL_POST = 'write.jsx/SET_ORIGINAL_POST';

const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE,
] = createRequestActionTypes('write.jsx/WRITE_POST');

const [
    UPDATE_POST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
] = createRequestActionTypes('write.jsx/UPDATE_POST');

const [
    WRITE_COMMENT,
    WRITE_COMMENT_SUCCESS,
    WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('write.jsx/WRITE_COMMENT');

export const writePost = createAction(WRITE_POST, ({title, content, token}) => ({
    title,
    content,
    token,
}));

export const updatePost = createAction(
    UPDATE_POST,
    ({id, title, content, token}) => ({
        id,
        title,
        content,
        token,
    }),
);

export const writeComment = createAction(
    WRITE_COMMENT,
    ({board_id, comment, token}) => ({
        board_id,
        comment,
        token,
    }),
);


export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}));



export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);

const writePostSaga = createRequestSagaReturnSuccess(WRITE_POST, postAPI.writePost);
const updatePostSaga = createRequestSagaReturnSuccess(UPDATE_POST, postAPI.updatePost);
const writeCommentSaga = createRequestSagaReturnSuccess(WRITE_COMMENT, postAPI.writeComment);

export function* writeSaga(){
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
    yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState = {
    title: '',
    content: '',
    comment: '',
    post: null,
    postError: null,
    originalPostId: null,
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key]: value,
        }),
        [WRITE_POST]: state => ({
            ...state,
            post: null,
            postError: null,
        }),
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
            ...state,
            postError,
        }),
        [SET_ORIGINAL_POST]: (state, {payload: post}) => ({
            ...state,
            title: post.title,
            content: post.content,
            originalPostId: post.board_id
        }),
        [UPDATE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post,
        }),
        [UPDATE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            postError,
        }),
        [WRITE_COMMENT_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post,
        }),
        [WRITE_COMMENT_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            postError,
        }),

    },
    initialState,
);

export default write;
