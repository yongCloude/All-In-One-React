import * as cafeAPI from '../../lib/api/cafe';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';


/** 지역 정보 불러오기 **/
const [
  LOAD_REGION,
  LOAD_REGION_SUCCESS,
  LOAD_REGION_FAILURE,
] = createRequestActionTypes('cafe/search/LOAD_REGION');

/** 카테고리 정보 불러오기 **/
const [
  LOAD_CATEGORY,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAILURE,
] = createRequestActionTypes('cafe/search/LOAD_CATEGORY');

/** 카페 검색 **/
const [
  SEARCH_CAFE,
  SEARCH_CAFE_SUCCESS,
  SEARCH_CAFE_FAILURE,
] = createRequestActionTypes('cafe/search/SEARCH_CAFE');

/** 검색 결과 초기화 **/
const RESET_CAFE = 'cafe/search/RESET_CAFE';


export const loadRegion = createAction(LOAD_REGION);
export const loadCategory = createAction(LOAD_CATEGORY);
export const searchCafe = createAction(SEARCH_CAFE, ({ cafe, province, city, category }) => ({
  cafe, province, city,
  category,
}));

export const reset = createAction(RESET_CAFE);


const loadRegionSaga = createRequestSaga(LOAD_REGION, cafeAPI.getRegion);
const loadCategorySaga = createRequestSaga(LOAD_CATEGORY, cafeAPI.getCategory);
const searchCafeSaga = createRequestSaga(SEARCH_CAFE, cafeAPI.searchCafe);

export function* cafeSearchSaga() {
  yield takeLatest(LOAD_REGION, loadRegionSaga);
  yield takeLatest(LOAD_CATEGORY, loadCategorySaga);
  yield takeLatest(SEARCH_CAFE, searchCafeSaga);
}

const initialState = {
  regions: null,
  categories: null,
  cafes: null,
  error: null,
};

const cafeSearch = handleActions(
  {
    [LOAD_REGION_SUCCESS]: (state, { payload: regions }) => ({
      ...state,
      regions: regions,
    }),
    [LOAD_REGION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [LOAD_CATEGORY_SUCCESS]: (state, { payload: categories }) => ({
      ...state,
      categories: categories,
    }),
    [LOAD_CATEGORY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [SEARCH_CAFE_SUCCESS]: (state, { payload: cafes }) => ({
      ...state,
      cafes: cafes,
    }),
    [SEARCH_CAFE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [RESET_CAFE]: (state) => ({
      ...state,
      cafes: null,
    }),

  },
  initialState,
);

export default cafeSearch;