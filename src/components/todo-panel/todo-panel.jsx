import React, {Component} from 'react'
import './todo-panel.css'
import TickGreenIcon from '../../icons/tick-green-icon.svg'
import CalendarIcon from '../../icons/calendar-icon.png'
import EditIcon from '../../icons/edit-icon.svg'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {markAsDone, editDateOnly, editTodo} from '../../actions/board-actions'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

class TodoPanel extends Component{

    constructor(props){
        super(props)

        this.handleTickClick = this.handleTickClick.bind(this)
        this.handlePanelClick = this.handlePanelClick.bind(this)
        this.handleCalendarClick = this.handleCalendarClick.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
    }

    handleTickClick(){
        const {markAsDone, selectedTodoId} = this.props
        markAsDone(selectedTodoId)
    }

    handleCalendarClick(){
        const {editDateOnly} = this.props
        editDateOnly()
    }

    handleEditClick(){
        const {editTodo} = this.props
        editTodo()
    }

    handlePanelClick(e){
        e.stopPropagation()
    }

    render(){
        const {hidePanel} = this.props
        const todoPanelClasses = classNames("todo-panel", {"todo-panel--invisible": hidePanel})
        return (
            <div className={todoPanelClasses} onClick={this.handlePanelClick}>
                <img className="todo-panel__icon" src={TickGreenIcon} onClick={this.handleTickClick}/>
                <Link to="/todo-date"><img className="todo-panel__icon" src={CalendarIcon} onClick={this.handleCalendarClick}/></Link>
                <Link to="/todo-details"><img className="todo-panel__icon" src={EditIcon} onClick={this.handleEditClick}/></Link>
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
    return bindActionCreators({markAsDone, editDateOnly, editTodo}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPanel)