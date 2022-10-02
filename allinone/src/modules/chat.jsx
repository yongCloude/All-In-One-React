
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnSuccess } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';


const [
    LIST_CHATS,
    LIST_CHATS_SUCCESS,
    LIST_CHATS_FAILURE,
] = createRequestActionTypes('chat/LIST_CHATS');

const GET_CHAT = 'chat/GET_CHAT';

export const listChats = createAction(LIST_CHATS, token => token);
export const getChat = createAction(GET_CHAT);

const readChatSaga = createRequestSagaReturnSuccess(LIST_CHATS, postAPI.readChat)
export function* chatSaga(){
    yield takeLatest(LIST_CHATS, readChatSaga);
}

const initialState = {
    messages: null,
    error: null,
};

const chat = handleActions(
    {
        [LIST_CHATS_SUCCESS]: (state, {payload: messages}) => ({
            ...state,
            messages: messages.data
        }),
        [LIST_CHATS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [GET_CHAT]: (state, {payload: message}) => ({
            ...state,
            messages: state.messages.concat(message)
        }),
    },
    initialState,
);

export default chat;