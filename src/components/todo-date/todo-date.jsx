import React, {Component} from 'react'
import EditIcon from '../../icons/edit-icon.svg'
import TodayIcon from '../../icons/today-icon.png'
import TomorrowIcon from '../../icons/tomorrow-icon.png'
import NextWeekIcon from '../../icons/next-week-icon.png'
import './todo-date.css'
import {connect} from 'react-redux'
import {getSelectedTodoDate, getSuggestedDate} from '../../utils/todo-date-utils'
import {getMonDate, getTodayDate, getTomorrowDate, getNextWeekDate} from '../../utils'
import {updateTodoDate, unselectTodo} from '../../actions/board-actions'
import {Link} from 'react-router-dom'

class TodoDate extends Component{

    constructor(props){
        super(props)

        this.submitTodoDateUpdate = this.submitTodoDateUpdate.bind(this)
    }

    submitTodoDateUpdate(id, date){
        const {updateTodoDate, unselectTodo, history} = this.props
        updateTodoDate(id, date)
        unselectTodo()
        history.replace("/")
    }

    render(){
        const {selectedTodoId, selectedTodoDate, suggestedDate} = this.props
        return(
            <div className="todo-date">
                <div className="todo-date__options-group">
                    <div className="todo-date__options-group__option">
                        <div className="todo-date__options-group__option__icon" onClick={this.handleEditIconClick}>
                            <Link to="/todo-calendar">
                                <img className="todo-date__options-group__option__icon__image" src={EditIcon}/>
                            </Link>
                        </div>
                        <h3>{getMonDate(selectedTodoDate)}</h3>
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
        selectedTodoDate: getSelectedTodoDate(state.board.allTodos, state.board.selectedTodoId),
        suggestedDate: getSuggestedDate(state.board.allTodos),
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoDate)