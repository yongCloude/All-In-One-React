import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import * as homeAPI from '../../lib/api/home';
import { takeLatest } from 'redux-saga/effects';
import post from '../post/post';
import cafeContainer from '../../containers/cafe/CafeContainer';

const [
  FETCH_POPULAR_POST,
  FETCH_POPULAR_POST_SUCCESS,
  FETCH_POPULAR_POST_FAILURE,
] = createRequestActionTypes('home/FETCH_POPULAR_POST');

const [
  FETCH_POPULAR_CAFE,
  FETCH_POPULAR_CAFE_SUCCESS,
  FETCH_POPULAR_CAFE_FAILURE,
] = createRequestActionTypes('home/FETCH_POPULAR_CAFE');


export const fetchPopularCafe = createAction(FETCH_POPULAR_CAFE);
export const fetchPopularPost = createAction(FETCH_POPULAR_POST);

const fetchPopularCafeSaga = createRequestSaga(FETCH_POPULAR_CAFE, homeAPI.fetchPopularCafe);
const fetchPopularPostSaga = createRequestSaga(FETCH_POPULAR_POST, homeAPI.fetchPopularPost);


export function* homeSaga() {
  yield takeLatest(FETCH_POPULAR_CAFE, fetchPopularCafeSaga);
  yield takeLatest(FETCH_POPULAR_POST, fetchPopularPostSaga);
}

const initialState = {
  cafe: null,
  post: null,
  error: null,
};

const home = handleActions(
  {
    [FETCH_POPULAR_CAFE_SUCCESS]: (state, { payload: cafe }) => ({
      ...state,
      cafe: cafe,
    }),

    [FETCH_POPULAR_CAFE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [FETCH_POPULAR_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post: post,
    }),

    [FETCH_POPULAR_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
)

export default home;