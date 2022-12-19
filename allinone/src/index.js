import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from '../node_modules/react-router-dom/index';

import rootReducer, { rootSaga } from './modules/index';
import { Provider } from '../node_modules/react-redux/es/exports';


import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from '../node_modules/redux-devtools-extension/index';
import createSagaMiddleware from 'redux-saga';

import { tempSetUser } from './modules/auth/auth';
import { QueryClient, QueryClientProvider } from 'react-query';




const sagaMiddleware = createSagaMiddleware();
const queryClient = new QueryClient();


const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(),
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if(!user) return;

    store.dispatch(tempSetUser(JSON.parse(user)));
  } catch(e){
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
