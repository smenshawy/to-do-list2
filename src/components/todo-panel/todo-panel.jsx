import React, {Component} from 'react'
import './todo-panel.css'
import TickGreenIcon from '../../icons/tick-green-icon.svg'
import CalendarIcon from '../../icons/calendar-icon.png'
import EditIcon from '../../icons/edit-icon.svg'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {markAsDone} from '../../actions/board-actions'

class TodoPanel extends Component{

    constructor(props){
        super(props)

        this.handleTickClick = this.handleTickClick.bind(this)
    }

    handleTickClick(){
        const {markAsDone, selectedTodoId} = this.props
        markAsDone(selectedTodoId)
    }

    render(){
        const {hidePanel} = this.props
        const todoPanelClasses = classNames("todo-panel", {"todo-panel--invisible": hidePanel})
        return (
            <div className={todoPanelClasses}>
                <img className="todo-panel__icon" src={TickGreenIcon} onClick={this.handleTickClick}/>
                <img className="todo-panel__icon" src={CalendarIcon}/>
                <img className="todo-panel__icon" src={EditIcon}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        hidePanel: state.board.selectedTodoId === 0,
        selectedTodoId: state.board.selectedTodoId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        markAsDone: (id) => {
            dispatch(markAsDone(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPanel)