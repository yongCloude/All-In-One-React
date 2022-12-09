import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import { createAction, handleActions } from 'redux-actions';
import * as chatAPI from '../../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';

/**
 * 채팅방 불러오기
 */
const [
  LIST_ROOMS,
  LIST_ROOMS_SUCCESS,
  LIST_ROOMS_FAILURE,
] = createRequestActionTypes('chat/room/LIST_ROOMS');

/**
 * 내가 만든 채팅방 불러오기
 */
const [
  LIST_MY_ROOMS,
  LIST_MY_ROOMS_SUCCESS,
  LIST_MY_ROOMS_FAILURE,
] = createRequestActionTypes('chat/room/LIST_MY_ROOMS');

/**
 * 채팅방 나가기
 */
const [
  EXIT_ROOM,
  EXIT_ROOM_SUCCESS,
  EXIT_ROOM_FAILURE,
] = createRequestActionTypes('chat/room/EXIT_ROOM');

/**
 * 채팅방 참가자 목록 불러오기
 */

const [
  LIST_ROOM_PARTICIPANTS,
  LIST_ROOM_PARTICIPANTS_SUCCESS,
  LIST_ROOM_PARTICIPANTS_FAILURE,
] = createRequestActionTypes('chat/room/LIST_ROOM_PARTICIPANTS');

/**
 * 채팅방에 초대하기
 * */
const [
  INVITE,
  INVITE_SUCCESS,
  INVITE_FAILURE,
] = createRequestActionTypes('chat/room/INVITE');

export const getRooms = createAction(LIST_ROOMS);
export const getMyRooms = createAction(LIST_MY_ROOMS, token => token);
export const exit = createAction(EXIT_ROOM, ({ token, channel_id }) => ({ token, channel_id }));
export const getRoomParticipants = createAction(LIST_ROOM_PARTICIPANTS, ({ token, channel_id }) => ({
  token,
  channel_id,
}));
export const invite = createAction(INVITE, ({token, channel_id, user_email, user_name}) => ({
  token,
  channel_id, user_email,
  user_name,
}));


/**
 *  Saga 생성
 */
const getRoomsSaga = createRequestSaga(LIST_ROOMS, chatAPI.getRooms);
const getMyRoomSaga = createRequestSaga(LIST_MY_ROOMS, chatAPI.getMyRooms);
const exitRoomSaga = createRequestSaga(EXIT_ROOM, chatAPI.exitRoom);
const getRoomParticipantsSaga = createRequestSaga(LIST_ROOM_PARTICIPANTS, chatAPI.getRoomParticipants);
const inviteSage = createRequestSaga(INVITE, chatAPI.invite);

export function* roomSaga() {
  yield takeLatest(LIST_ROOMS, getRoomsSaga);
  yield takeLatest(LIST_MY_ROOMS, getMyRoomSaga);
  yield takeLatest(EXIT_ROOM, exitRoomSaga);
  yield takeLatest(LIST_ROOM_PARTICIPANTS, getRoomParticipantsSaga);
  yield takeLatest(INVITE, inviteSage);
}

const initialState = {
  rooms: null,
  participants: null,
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

    [LIST_ROOM_PARTICIPANTS_SUCCESS]: (state, { payload: participants }) => ({
      ...state,
      participants: participants.data.users,
    }),
    [LIST_ROOM_PARTICIPANTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [INVITE_SUCCESS]: (state, { payload: isSuccess }) => ({
      ...state,
    }),
    [INVITE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

  },
  initialState,
);

export default room;