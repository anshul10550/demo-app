import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './rootReducers.js'



import registerServiceWorker from './registerServiceWorker';



registerServiceWorker();
let store = createStore(
	rootReducer,
  	['Use Redux'],
  	applyMiddleware(thunk))

ReactDOM.render(
   <Provider store={store}>
      <App/>
   </Provider>, document.getElementById('root')
);

