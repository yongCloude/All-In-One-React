
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnSuccess } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/chat';
import { takeLatest } from 'redux-saga/effects';


const [
    LIST_CHATS,
    LIST_CHATS_SUCCESS,
    LIST_CHATS_FAILURE,
] = createRequestActionTypes('chat/LIST_CHATS');


export const listChats = createAction(LIST_CHATS, token => token);

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
    },
    initialState,
);

export default chat;