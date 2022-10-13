
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnSuccess } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';


const [
    LIST_CHATS,
    LIST_CHATS_SUCCESS,
    LIST_CHATS_FAILURE,
] = createRequestActionTypes('chat/LIST_CHATS');

const [
    LIST_MY_ROOMS,
    LIST_MY_ROOMS_SUCCESS,
    LIST_MY_ROOMS_FAILURE,
] = createRequestActionTypes('chat/LIST_MY_ROOMS');

const [
    LIST_ROOMS,
    LIST_ROOMS_SUCCESS,
    LIST_ROOMS_FAILURE,
] = createRequestActionTypes('chat/LIST_ROOMS');

const [
    EXIT_ROOM,
    EXIT_ROOM_SUCCESS,
    EXIT_ROOM_FAILURE,
] = createRequestActionTypes('chat/EXIT_ROOM');


const GET_CHAT = 'chat/GET_CHAT';

export const listChats = createAction(LIST_CHATS, ({token, channel_id}) => ({token, channel_id}));
export const getChat = createAction(GET_CHAT);

export const listRooms = createAction(LIST_ROOMS);
export const listMyRooms = createAction(LIST_MY_ROOMS, token => token); 
export const exitRoom = createAction(EXIT_ROOM, ({token, channel_id}) => ({token, channel_id}));

const readChatSaga = createRequestSaga(LIST_CHATS, postAPI.readChat);
const getRoomSaga = createRequestSagaReturnSuccess(LIST_ROOMS, postAPI.getRooms);
const getMyRoomSaga = createRequestSagaReturnSuccess(LIST_MY_ROOMS, postAPI.getMyRooms);
const exitRoomSaga = createRequestSagaReturnSuccess(EXIT_ROOM, postAPI.exitRoom);
export function* chatSaga(){
    yield takeLatest(LIST_CHATS, readChatSaga);
    yield takeLatest(LIST_ROOMS, getRoomSaga);
    yield takeLatest(LIST_MY_ROOMS, getMyRoomSaga);
    yield takeLatest(EXIT_ROOM, exitRoomSaga);
}

const initialState = {
    messages: null,
    rooms: null,
    error: null,
};

const chat = handleActions(
    {
        [LIST_CHATS_SUCCESS]: (state, {payload: messages}) => ({
            ...state,
            messages: messages.records
        }),
        [LIST_CHATS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [GET_CHAT]: (state, {payload: message}) => ({
            ...state,
            messages: state.messages.concat(message)
        }),
        [LIST_ROOMS_SUCCESS]: (state, {payload: rooms}) => ({
            ...state,
            rooms: rooms.data
        }),
        [LIST_ROOMS_FAILURE]: (state, {payload:error}) => ({
            ...state,
            error,
        }),
        [LIST_MY_ROOMS_SUCCESS]: (state, {payload: rooms}) => ({
            ...state,
            rooms: rooms.data
        }),
        [LIST_MY_ROOMS_FAILURE]: (state, {payload:error}) => ({
            ...state,
            error,
        }), 
        [EXIT_ROOM_SUCCESS]: (state, {payload: isSuccess}) => ({
            ...state,
        }),
        [EXIT_ROOM_FAILURE]: (state, {payload:error}) => ({
            ...state,
            error,
        }), 
    },
    initialState,
);

export default chat;