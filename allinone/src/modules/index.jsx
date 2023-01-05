import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth/auth';
import loading from './loading';
import write, { writeSaga } from './post/write';
import post, { postSaga } from './post/post';
import posts, { postsSaga } from './post/posts';
import room, { roomSaga }from './chat/room';
import message, { messageSaga } from './chat/message';
import wMessage, {writeMessageSaga} from './chat/write';
import createRoom, {createRoomSaga} from './chat/create';
import cafeSearch, { cafeSearchSaga } from './cafe/search';
import cafeDetail, { cafeDetailSaga } from './cafe/detail';
import home, { homeSaga } from './home/home';
const rootReducer = combineReducers({
  auth,
  loading,
  write,
  post,
  posts,
  room,
  message,
  wMessage,
  createRoom,
  cafeSearch,
  cafeDetail,
  home
});

export function* rootSaga() {
  yield all([
    authSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    roomSaga(),
    messageSaga(),
    writeMessageSaga(),
    createRoomSaga(),
    cafeSearchSaga(),
    cafeDetailSaga(),
    homeSaga(),
  ]);
}

export default rootReducer;
