import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnSuccess } from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FILED = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
] = createRequestActionTypes('auth/REGISTER');

const [
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
] = createRequestActionTypes('auth/LOGIN');

const [
  LIST_FRIENDS,
  LIST_FRIENDS_SUCCESS,
  LIST_FRIENDS_FAILURE,
] = createRequestActionTypes('auth/LIST_FRIENDS');

const [
  DELETE_FRIENDS,
  DELETE_FRIENDS_SUCCESS,
  DELETE_FRIENDS_FAILURE,
] = createRequestActionTypes('auth/DELETE_FRIENDS')

const TEMP_SET_USER = 'auth/TEMP_SET_USER';
const LOGOUT = 'auth/LOGOUT';

function* logoutSaga() {
  try {
    yield
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}


export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);

export const logout = createAction(LOGOUT);

export const changeField = createAction(
  CHANGE_FILED,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const register = createAction(
  REGISTER,
  ({ email, password, name, birth, gender, phone }) => ({
    email,
    password,
    name,
    birth,
    gender,
    phone,
  }),
);

export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}));

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  ({ email, name, birth, gender, phoneNumber, accessToken, refreshToken }) => ({
    email,
    name,
    birth,
    gender,
    phoneNumber,
    accessToken,
    refreshToken,
  }),
);

export const getFriends = createAction(LIST_FRIENDS, token => token);

export const deleteFriend = createAction(DELETE_FRIENDS, ({ token, friend_id }) => ({ token, friend_id }));

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const friendsSaga = createRequestSaga(LIST_FRIENDS, authAPI.getFriends);
const deleteFriendSaga = createRequestSaga(DELETE_FRIENDS, authAPI.deleteFriend);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(LIST_FRIENDS, friendsSaga);
  yield takeLatest(DELETE_FRIENDS, deleteFriendSaga);
}

const initialState = {
  register: {
    email: '',
    password: '',
    name: '',
    birth: '',
    gender: '',
    phone: '',
  },
  login: {
    email: '',
    password: '',
  },
  user: null,
  friends: null,
};

const auth = handleActions(
  {
    [CHANGE_FILED]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, ) => ({
      ...state,
      authError: null,
      
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      user: auth.data,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user: user,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null,
    }),

    // 친구목록 불러오기
    [LIST_FRIENDS_SUCCESS]: (state, { payload: friends }) => ({
      ...state,
      friends,
    }),

    // 친구목록 불러오기 실패
    [LIST_FRIENDS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    // 친구 삭제
    [DELETE_FRIENDS_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      result,
    }),

    // 친구 삭제 실패
    [DELETE_FRIENDS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

  },

  initialState,
);

export default auth;
