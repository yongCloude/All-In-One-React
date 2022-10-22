import * as postAPI from '../../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';


/**
 * 기존의 채팅 내역 불러오기
 */
const [
  LOAD_CHATS,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
] = createRequestActionTypes('chat/LOAD_CHATS');

/**
 * 메세지 전송 후 채팅 내역 업데이트
 * @type {string}
 */
const UPDATE_CHAT = 'chat/UPDATE_CHAT';


export const loadChats = createAction(LOAD_CHATS, ({ token, channel_id }) => ({ token, channel_id }));
export const updateChat = createAction(UPDATE_CHAT);


const loadChatSaga = createRequestSaga(LOAD_CHATS, postAPI.readChat);

export function* messageSaga() {
  yield takeLatest(LOAD_CHATS, loadChatSaga);
}

const initialState = {
  messages: null,
  error: null,
};

const message = handleActions(
  {
    [UPDATE_CHAT]: (state, { payload: message }) => ({
      ...state,
      messages: state.messages.concat(message),
    }),

    [LOAD_CHATS_SUCCESS]: (state, { payload: messages }) => ({
      ...state,
      messages: messages.data.records,
    }),
    [LOAD_CHATS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default message;