import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnSuccess } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';

const [
    WRITE_CHAT,
    WRITE_CHAT_SUCCESS,
    WRITE_CHAT_FAILURE,
] = createRequestActionTypes('chat/WRITE_CHAT');

const CHANGE_FIELD = 'chat/CHANGE_FIELD'; // 특정 key 값 바꾸기
const INITIALIZE = 'chat/INITIALIZE'; // 모든 내용 초기화

export const initialize = createAction(INITIALIZE);

export const writeChat = createAction(WRITE_CHAT, ({content, token}) => ({
    content,
    token
}));

export const changeField = createAction(CHANGE_FIELD, value => value);


const writeChatsSaga = createRequestSagaReturnSuccess(WRITE_CHAT, postAPI.writeChat);

export function* writeChatSaga(){
    yield takeLatest(WRITE_CHAT, writeChatsSaga);
}

const initialState = {
    comment: '',
    chatError: null,
};

const wChat = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, {payload: value}) => ({
            ...state,
            comment: value,
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
    },
    initialState,
);

export default wChat;