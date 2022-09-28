import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';


const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

const INITIALIZE = 'posts/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'posts/CHANGE_FIELD'; // 특정 key 값 바꾸기


export const listPosts = createAction(
    LIST_POSTS,
    ({all, writer, title}) => ({all, writer, title})
);

const listPostSaga = createRequestSaga(LIST_POSTS, postAPI.listPosts);
export function* postsSaga() {
    yield takeLatest(LIST_POSTS, listPostSaga);
}

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}));


const initialState = {
    posts: null,
    query: {
        all: '',
        writer: '',
        title: '',
    },
    error: null,
    lastPage: 1,
};

const posts = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            query:{
                ...state.query,
                [key]: value
            }
        }),
        [LIST_POSTS_SUCCESS]: (state, {payload: posts}) => ({
            ...state,
            posts,
            
        }),
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        
    },
    initialState,
);

export default posts;