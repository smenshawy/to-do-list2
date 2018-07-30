import React, {Component} from 'react'
import Calendar from 'react-calendar'
import {updateTodoDate, unselectTodo, setNewDate} from '../../actions/board-actions'
import {connect} from 'react-redux'
import {getSelectedTodoDate} from '../../utils/todo-date-utils'
import {getTodayDate} from '../../utils'
import {bindActionCreators} from 'redux'
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
        const {editDateOnly, updateTodoDate, unselectTodo, history} = this.props
        console.log(editDateOnly)
        if(editDateOnly){
            updateTodoDate(id, date)
            unselectTodo()
            history.replace("/")
        } else {
            setNewDate(date)
            history.replace("/todo-details")
        }
    }

    render(){
        const {selectedTodoDate, newDate} = this.props
        return (
            <div className="todo-calendar">
                <Calendar
                    minDate={getTodayDate()}
                    onChange={this.handleCalendarChange}
                    value={newDate || selectedTodoDate}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedTodoId: state.board.selectedTodoId,
        selectedTodoDate: getSelectedTodoDate(state.board.allTodos, state.board.selectedTodoId),
        editDateOnly: state.board.editDateOnly,
        newDate: state.board.newDate,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({updateTodoDate, unselectTodo, setNewDate}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCalendar)