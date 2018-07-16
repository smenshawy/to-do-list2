import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board/board';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import reduxLogger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(reduxLogger))
ReactDOM.render(
    <Provider store={store}>
        <Board />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
