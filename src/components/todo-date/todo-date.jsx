import React, {Component} from 'react'
import EditIcon from '../../icons/edit-icon.svg'
import TodayIcon from '../../icons/today-icon.png'
import TomorrowIcon from '../../icons/tomorrow-icon.png'
import NextWeekIcon from '../../icons/next-week-icon.png'
import './todo-date.css'
import {connect} from 'react-redux'
import {getSelectedTodoDate, getSuggestedDate} from '../../utils/todo-date-utils'
import {getMonDate, getTodayDate, getTomorrowDate, getNextWeekDate} from '../../utils'
import {updateTodoDate, unselectTodo, setNewDate} from '../../actions/board-actions'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

class TodoDate extends Component{

    constructor(props){
        super(props)

        this.submitTodoDateUpdate = this.submitTodoDateUpdate.bind(this)
    }

    submitTodoDateUpdate(id, date){
        const {editDateOnly, updateTodoDate, unselectTodo, history, setNewDate} = this.props
        if(editDateOnly){
            updateTodoDate(id, date)
            unselectTodo()
            history.replace("/")
        } else {
            console.log(1)
            setNewDate(date)
            history.replace("/todo-details")
        }
    }

    render(){
        const {selectedTodoId, selectedTodoDate, suggestedDate, newDate} = this.props
        return(
            <div className="todo-date">
                <div className="todo-date__options-group">
                    <div className="todo-date__options-group__option">
                        <div className="todo-date__options-group__option__icon" onClick={this.handleEditIconClick}>
                            <Link to="/todo-calendar">
                                <img className="todo-date__options-group__option__icon__image" src={EditIcon}/>
                            </Link>
                        </div>
                        <h3>{getMonDate(newDate || selectedTodoDate)}</h3>
                    </div>
                    <div className="todo-date__options-group__option" onClick={e=> {this.submitTodoDateUpdate(selectedTodoId, suggestedDate)}}>
                        <div className="todo-date__options-group__option__icon">
                            {getMonDate(suggestedDate)}
                        </div>
                        <h3>Suggested</h3>
                    </div>
                </div>
                <div className="todo-date__options-group">
                    <div className="todo-date__options-group__option" onClick={e=>[this.submitTodoDateUpdate(selectedTodoId, getTodayDate())]}>
                        <div className="todo-date__options-group__option__icon">
                            <img className="todo-date__options-group__option__icon__image" src={TodayIcon}/>
                        </div>
                        <h3>Today</h3>
                    </div>
                    <div className="todo-date__options-group__option" onClick={e=>{this.submitTodoDateUpdate(selectedTodoId, getTomorrowDate())}}>
                        <div className="todo-date__options-group__option__icon">
                            <img className="todo-date__options-group__option__icon__image" src={TomorrowIcon}/>
                        </div>
                        <h3>Tomorrow</h3>
                    </div>
                    <div className="todo-date__options-group__option" onClick={e=>{this.submitTodoDateUpdate(selectedTodoId, getNextWeekDate())}}>
                        <div className="todo-date__options-group__option__icon">
                            <img className="todo-date__options-group__option__icon__image" src={NextWeekIcon}/>
                        </div>
                        <h3>Next week</h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedTodoId: state.board.selectedTodoId,
        selectedTodoDate: state.board.selectedTodoId > 0? getSelectedTodoDate(state.board.allTodos, state.board.selectedTodoId) : null,
        suggestedDate: getSuggestedDate(state.board.allTodos),
        editDateOnly: state.board.editDateOnly,
        newDate: state.board.newDate,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({updateTodoDate, unselectTodo, setNewDate}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoDate)