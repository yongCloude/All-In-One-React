import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../../lib/createRequestSaga";
import * as authAPI from '../../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';


const TEMP_SET_USER = 'auth/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI.login);
export function* userSaga(){
    yield takeLatest(CHECK, checkSaga);
}

const initialState = {
    user: null,
    checkError: null,
};


export default handleActions(
    {
        [TEMP_SET_USER]: (state, {payload: user}) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]: (state, {payload: user}) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, {payload: error}) => ({
            ...state,
            user: null,
            checkError: error,
        }),
    },
    initialState,
)


