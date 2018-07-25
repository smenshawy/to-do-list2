import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import reduxLogger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxLogger)))
ReactDOM.render(
        <App store={store}/>, 
        document.getElementById('root'));
registerServiceWorker();
