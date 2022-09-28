import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import chat, { chatSaga } from './chat';
import wChat, { writeChatSaga } from './chat_write';

const rootReducer = combineReducers({
  auth,
  loading,
  write,
  post,
  posts,
  chat,
  wChat,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    chatSaga(),
    writeChatSaga(),
  ]);
}

export default rootReducer;
