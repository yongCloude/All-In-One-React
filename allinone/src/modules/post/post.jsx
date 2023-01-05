import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import * as postAPI from '../../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';


const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';

const [
  LIKE_POST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
] = createRequestActionTypes('post/LIKE_POST');

const [
  UNLIKE_POST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
] = createRequestActionTypes('post/UNLIKE_POST');

export const fetchPost = createAction(READ_POST, (id, accessToken) => ({ id, accessToken }));
export const unloadPost = createAction(UNLOAD_POST);
export const likePost = createAction(LIKE_POST, (board_id, accessToken) => ({ board_id, accessToken }));
export const unLikePost = createAction(UNLIKE_POST, (board_id, accessToken) => ({ board_id, accessToken }));

const fetchPostSaga = createRequestSaga(READ_POST, postAPI.fetchPost);
const likePostSaga = createRequestSaga(LIKE_POST, postAPI.like);
const unlikePostSaga = createRequestSaga(LIKE_POST, postAPI.unlike);

export function* postSaga() {
  yield takeLatest(READ_POST, fetchPostSaga);
  yield takeLatest(LIKE_POST, likePostSaga);
  yield takeLatest(UNLIKE_POST, unlikePostSaga);
}

const initialState = {
  post: null,
  error: null,
  like: false,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post: post.data,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,

    [LIKE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      like: true,
    }),

    [LIKE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [UNLIKE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      like: false,
    }),

    [UNLIKE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default post;