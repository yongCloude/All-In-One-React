import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';
import * as postAPI from '../../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';


/**
 * 채팅방 생성하기
 */
const [
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
] = createRequestActionTypes('chat/room/CREATE_ROOM');

const INITIALIZE = 'chat/room/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'chat/room/CHANGE_FIELD'; // 특정 key 값 바꾸기


export const createChatRoom = createAction(CREATE_ROOM, ({token, title}) => ({
  token,
  title,
}));

export const initialize = createAction(INITIALIZE);

export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
  key,
  value
}));

const createSaga = createRequestSaga(CREATE_ROOM, postAPI.createRoom);

const initialState = {
  title: '',
  error: null,
};

export function* createRoomSaga(){
  yield takeLatest(CREATE_ROOM, createSaga);
}

const createRoom = handleActions(
  {
    [INITIALIZE]: state => initialState,

    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),

    [CREATE_ROOM]: state => ({
      ...state,
      title: null,
      error: null,
    }),
    [CREATE_ROOM_SUCCESS]: (state, { payload: room }) => ({
      ...state,
      room,
    }),
    [CREATE_ROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default createRoom;