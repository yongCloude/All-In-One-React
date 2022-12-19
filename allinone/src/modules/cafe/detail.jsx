import * as cafeAPI from '../../lib/api/cafe';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';


/** 카페 세부 정보 불러오기 **/
const [
  LOAD_CAFE_DETAIL,
  LOAD_CAFE_DETAIL_SUCCESS,
  LOAD_CAFE_DETAIL_FAILURE,
] = createRequestActionTypes('cafe/detail/LOAD_CAFE_DETAIL');

/** 평가 작성하기 **/
const [
  WRITE_EVALUATION,
  WRITE_EVALUATION_SUCCESS,
  WRITE_EVALUATION_FAILURE,
] = createRequestActionTypes('cafe/detail/WRITE_EVALUATION');

/** 평가 수정 **/
const [
  MODIFY_EVALUATION,
  MODIFY_EVALUATION_SUCCESS,
  MODIFY_EVALUATION_FAILURE,
] = createRequestActionTypes('cafe/detail/MODIFY_EVALUATION');

/** 평가 삭제 **/
const [
  DELETE_EVALUATION,
  DELETE_EVALUATION_SUCCESS,
  DELETE_EVALUATION_FAILURE,
] = createRequestActionTypes('cafe/detail/DELETE_EVALUATION');

/** 스크랩 하기 **/
const [
  SCRAP,
  SCRAP_SUCCESS,
  SCRAP_FAILURE,
] = createRequestActionTypes('/cafe/detail/SCRAP');
/** 스크랩 불러오기 **/
const [
  LOAD_SCRAP,
  LOAD_SCRAP_SUCCESS,
  LOAD_SCRAP_FAILURE,
] = createRequestActionTypes('/cafe/detail/LOAD_SCRAP');

/** 스크랩 삭제 **/
const [
  DELETE_SCRAP,
  DELETE_SCRAP_SUCCESS,
  DELETE_SCRAP_FAILURE,
] = createRequestActionTypes('/cafe/detail/DELEATE_SCRAP');

export const loadCafeDetail = createAction(LOAD_CAFE_DETAIL, (cafe_id) => (cafe_id));
export const writeEvaluation = createAction(WRITE_EVALUATION, ({
                                                                 token,
                                                                 cafe_id,
                                                                 formData,
                                                               }) => ({
  token,
  cafe_id,
  formData,
}));

export const modifyEvaluation = createAction(MODIFY_EVALUATION, ({
                                                                   token,
                                                                   start_rating,
                                                                   content,
                                                                   category_1,
                                                                   category_2,
                                                                   category_3,
                                                                 }) => ({
  token,
  start_rating,
  content,
  category_1,
  category_2,
  category_3,
}));

export const deleteEvaluation = createAction(DELETE_EVALUATION, ({ token, cafe_id, eval_id }) => ({
  token,
  cafe_id,
  eval_id,
}));

export const scrap = createAction(SCRAP, ({token, cafe_id}) => ({token, cafe_id}))
export const loadScrap = createAction(LOAD_SCRAP, (token) => (token));
export const deleteScrap = createAction(DELETE_SCRAP, ({token, cafe_id, scrap_id}) => ({token, cafe_id, scrap_id}))


const loadCafeDetailSaga = createRequestSaga(LOAD_CAFE_DETAIL, cafeAPI.getCafeDetail);
const writeEvaluationSaga = createRequestSaga(WRITE_EVALUATION, cafeAPI.evaluate);
const modifyEvaluationSaga = createRequestSaga(MODIFY_EVALUATION, cafeAPI.modifyEvaluation);
const deleteEvaluationSaga = createRequestSaga(DELETE_EVALUATION, cafeAPI.deleteEvaluate);

const scrapSaga = createRequestSaga(SCRAP, cafeAPI.scrap);
const loadScrapSaga = createRequestSaga(LOAD_SCRAP, cafeAPI.getScraps);
const deleteScrapSaga = createRequestSaga(DELETE_SCRAP, cafeAPI.deleteScrap);

export function* cafeDetailSaga() {
  yield takeLatest(LOAD_CAFE_DETAIL, loadCafeDetailSaga);
  yield takeLatest(WRITE_EVALUATION, writeEvaluationSaga);
  yield takeLatest(MODIFY_EVALUATION, modifyEvaluationSaga);
  yield takeLatest(DELETE_EVALUATION, deleteEvaluationSaga);
  yield takeLatest(SCRAP, scrapSaga);
  yield takeLatest(LOAD_SCRAP, loadScrapSaga);
  yield takeLatest(DELETE_SCRAP, deleteScrapSaga);
}

const initialState = {
  detail: null,
  scraps: null,
  error: null,
};

const cafeDetail = handleActions(
  {
    [LOAD_CAFE_DETAIL_SUCCESS]: (state, { payload: detail }) => ({
      ...state,
      detail,
    }),
    [LOAD_CAFE_DETAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [WRITE_EVALUATION_SUCCESS]: (state, { payload: write }) => ({
      ...state,
    }),
    [WRITE_EVALUATION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [MODIFY_EVALUATION_SUCCESS]: (state, { payload: write }) => ({
      ...state,
    }),
    [MODIFY_EVALUATION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [DELETE_EVALUATION_SUCCESS]: (state, { payload: write }) => ({
      ...state,
    }),
    [DELETE_EVALUATION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [SCRAP_SUCCESS]: (state, ) => ({
      ...state,
    }),
    [SCRAP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [LOAD_SCRAP_SUCCESS]: (state, { payload: scraps }) => ({
      ...state,
      scraps,
    }),
    [LOAD_SCRAP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [DELETE_SCRAP_SUCCESS]: (state) => ({
      ...state,
    }),
    [DELETE_SCRAP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

  },
  initialState,
);

export default cafeDetail;