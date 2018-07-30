import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Board from './components/board/board'
import TodoDate from './components/todo-date/todo-date'
import TodoCalendar from './components/todo-calendar/todo-calendar'
import TodoDetails from './components/todo-details/todo-details'
import {Provider} from 'react-redux'

class App extends Component {
  render() {
    const {store} = this.props
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Board}/>
            <Route path="/todo-date" component={TodoDate}/>
            <Route path="/todo-calendar" component={TodoCalendar}/>
            <Route path="/todo-details" component={TodoDetails}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
