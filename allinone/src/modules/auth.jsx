import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequestSagaReturnSuccess } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FILED = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

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

// 사가 생성
const registerSaga = createRequestSagaReturnSuccess(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
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
      user: auth,
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
  },

  initialState,
);

export default auth;
