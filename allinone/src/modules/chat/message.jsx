import * as chatAPI from '../../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';


/**
 * 기존의 채팅 내역 불러오기
 */
const [
  LOAD_MESSAGES,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_FAILURE,
] = createRequestActionTypes('chat/message/LOAD_MESSAGES');

/**
 * 메세지 전송 후 채팅 내역 업데이트
 * @type {string}
 */
const UPDATE_MESSAGE = 'chat/message/UPDATE_MESSAGE';

/**
 * 메세지 검색하기
 */
const [
  SEARCH_MESSAGE,
  SEARCH_MESSAGE_SUCCESS,
  SEARCH_MESSAGE_FAILURE
] = 'chat/message/SEARCH_MESSAGE';


export const loadMessage = createAction(LOAD_MESSAGES, ({ token, channel_id }) => ({ token, channel_id }));
export const updateChat = createAction(UPDATE_MESSAGE);
export const searchMessage = createAction(SEARCH_MESSAGE, ({ token, channel_id, content }) => ({ token, channel_id, content }));

const loadChatSaga = createRequestSaga(LOAD_MESSAGES, chatAPI.loadMessage);
const searchMessageSaga = createRequestSaga(SEARCH_MESSAGE, chatAPI.searchMessage);

export function* messageSaga() {
  yield takeLatest(LOAD_MESSAGES, loadChatSaga);
  yield takeLatest(SEARCH_MESSAGE, searchMessageSaga);
}

const initialState = {
  messages: null,
  searchMessage: null,
  error: null,
};

const message = handleActions(
  {
    [UPDATE_MESSAGE]: (state, { payload: message }) => ({
      ...state,
      messages: state.messages.concat(message),
    }),

    [LOAD_MESSAGES_SUCCESS]: (state, { payload: messages }) => ({
      ...state,
      messages: messages.data.records,
    }),
    [LOAD_MESSAGES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [SEARCH_MESSAGE_SUCCESS]: (state, { payload: searchMessage }) => ({
      ...state,
      searchMessage: searchMessage.data,
    }),
    [SEARCH_MESSAGE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default message;