import * as chatAPI from '../../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';

const [
  WRITE_MESSAGE,
  WRITE_MESSAGE_SUCCESS,
  WRITE_MESSAGE_FAILURE,
] = createRequestActionTypes('chat/message/WRITE_MESSAGE');

const CHANGE_FIELD = 'chat/message/CHANGE_FIELD'; // 특정 key 값 바꾸기
const INITIALIZE = 'chat/message/INITIALIZE'; // 모든 내용 초기화


export const initialize = createAction(INITIALIZE);

export const writeMessage = createAction(WRITE_MESSAGE, ({content, token, channel_id}) => ({
  content,
  token,
  channel_id
}));

export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
  key,
  value
}));

const writeSaga = createRequestSaga(WRITE_MESSAGE, chatAPI.writeMessage);

export function* writeMessageSaga() {
  yield takeLatest(WRITE_MESSAGE, writeSaga);
}

const initialState = {
  message: '',
  error: null,
};

const wMessage = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_MESSAGE]: state => ({
      ...state,
      message: null,
      error: null,
    }),
    [WRITE_MESSAGE_SUCCESS]: (state, { payload: chat }) => ({
      ...state,
      chat,
    }),
    [WRITE_MESSAGE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default wMessage;

