import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnSuccess } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';

const [
    WRITE_CHAT,
    WRITE_CHAT_SUCCESS,
    WRITE_CHAT_FAILURE,
] = createRequestActionTypes('chat/WRITE_CHAT');

const [
    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILURE,
] = createRequestActionTypes('chat/CREATE_ROOM');

const CHANGE_FIELD = 'chat/CHANGE_FIELD'; // 특정 key 값 바꾸기
const INITIALIZE = 'chat/INITIALIZE'; // 모든 내용 초기화

export const initialize = createAction(INITIALIZE);

export const writeChat = createAction(WRITE_CHAT, ({content, token, channel_id}) => ({
    content,
    token,
    channel_id
}));

export const createRoom = createAction(CREATE_ROOM, ({token, roomTitle}) => ({
    token,
    roomTitle,
}));

export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}));


const writeChatsSaga = createRequestSagaReturnSuccess(WRITE_CHAT, postAPI.writeChat);
const createRoomSaga = createRequestSagaReturnSuccess(CREATE_ROOM, postAPI.createRoom);
export function* writeChatSaga(){
    yield takeLatest(WRITE_CHAT, writeChatsSaga);
    yield takeLatest(CREATE_ROOM, createRoomSaga);
}

const initialState = {
    comment: '',
    roomTitle: '',
    chatError: null,
};

const wChat = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key]: value,
        }),
        [WRITE_CHAT]: state => ({
            ...state,
            comment: null,
            chatError: null,
        }),
        [WRITE_CHAT_SUCCESS]: (state, { payload: chat}) => ({
            ...state,
            chat,
        }),
        [WRITE_CHAT_FAILURE]: (state, { payload: chatError }) => ({
            ...state,
            chatError,
        }),

        [CREATE_ROOM]: state => ({
            ...state,
            roomTitle: null,
            roomError: null,
        }),
        [CREATE_ROOM_SUCCESS]: (state, { payload: room}) => ({
            ...state,
            room,
        }),
        [CREATE_ROOM_FAILURE]: (state, { payload: roomError }) => ({
            ...state,
            roomError,
        }),
        
    },
    initialState,
);

export default wChat;