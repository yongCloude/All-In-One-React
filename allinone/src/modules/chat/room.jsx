import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';
import * as postAPI from '../../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';

/**
 * 채팅방 불러오기
 */
const [
  LIST_ROOMS,
  LIST_ROOMS_SUCCESS,
  LIST_ROOMS_FAILURE,
] = createRequestActionTypes('chat/LIST_ROOMS');

/**
 * 내가 만든 채팅방 불러오기
 */
const [
  LIST_MY_ROOMS,
  LIST_MY_ROOMS_SUCCESS,
  LIST_MY_ROOMS_FAILURE,
] = createRequestActionTypes('chat/LIST_MY_ROOMS');

/**
 * 채팅방 나가기
 */
const [
  EXIT_ROOM,
  EXIT_ROOM_SUCCESS,
  EXIT_ROOM_FAILURE,
] = createRequestActionTypes('chat/EXIT_ROOM');


export const getRooms = createAction(LIST_ROOMS);
export const getMyRooms = createAction(LIST_MY_ROOMS, token => token);
export const exit = createAction(EXIT_ROOM, ({token, channel_id}) => ({token, channel_id}));

/**
 *  Saga 생성
 */
const getRoomsSaga = createRequestSaga(LIST_ROOMS, postAPI.getRooms);
const getMyRoomSaga = createRequestSaga(LIST_MY_ROOMS, postAPI.getMyRooms);
const exitRoomSaga = createRequestSaga(EXIT_ROOM, postAPI.exitRoom);

export function* roomSaga() {
  yield takeLatest(LIST_ROOMS, getRoomsSaga);
  yield takeLatest(LIST_MY_ROOMS, getMyRoomSaga);
  yield takeLatest(EXIT_ROOM, exitRoomSaga);
}

const initialState = {
  rooms: null,
  users: null,
  myRooms: null,
  error: null,
};

const room = handleActions(
  {
    [LIST_ROOMS_SUCCESS]: (state, { payload: rooms }) => ({
      ...state,
      rooms: rooms,
    }),
    [LIST_ROOMS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [LIST_MY_ROOMS_SUCCESS]: (state, { payload: myRooms }) => ({
      ...state,
      myRooms,
    }),
    [LIST_MY_ROOMS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [EXIT_ROOM_SUCCESS]: (state, { payload: isSuccess }) => ({
      ...state,
    }),
    [EXIT_ROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default room;