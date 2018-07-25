import React, {Component} from 'react'
import Calendar from 'react-calendar'
import {updateTodoDate, unselectTodo} from '../../actions/board-actions'
import {connect} from 'react-redux'
import {getSelectedTodoDate} from '../../utils/todo-date-utils'
import {getTodayDate} from '../../utils'
import './todo-calendar.css'

class TodoCalendar extends Component{

    constructor(props){
        super(props)

        this.handleCalendarChange = this.handleCalendarChange.bind(this)
        this.submitTodoDateUpdate = this.submitTodoDateUpdate.bind(this)
    }

    handleCalendarChange(date){
        const {selectedTodoId} = this.props
        this.submitTodoDateUpdate(selectedTodoId, date)
    }

    submitTodoDateUpdate(id, date){
        const {updateTodoDate, unselectTodo, history} = this.props
        updateTodoDate(id, date)
        unselectTodo()
        history.replace("/")
    }

    render(){
        const {selectedTodoDate} = this.props
        return (
            <div className="todo-calendar">
                <Calendar
                    minDate={getTodayDate()}
                    onChange={this.handleCalendarChange}
                    value={selectedTodoDate}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedTodoId: state.board.selectedTodoId,
        selectedTodoDate: getSelectedTodoDate(state.board.allTodos, state.board.selectedTodoId),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTodoDate: (id, date) => {
            dispatch(updateTodoDate(id, date))
        },
        unselectTodo: () => {
            dispatch(unselectTodo())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCalendar)