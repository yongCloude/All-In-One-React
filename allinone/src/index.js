import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from '../node_modules/react-router-dom/index';

import rootReducer from './modules/index';
import { Provider } from '../node_modules/react-redux/es/exports';


import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '../node_modules/redux-devtools-extension/index';






const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools,
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
