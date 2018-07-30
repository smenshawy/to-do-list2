import React, {Component} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import BackIcon from '../../icons/back-icon.svg'
import GoIcon from '../../icons/go-icon.svg'
import CalendarIcon from '../../icons/calendar-icon.png'
import FlagIcon from '../../icons/flag-icon.svg'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSelectedTodo} from '../../utils/board-utils'
import {getMonDate} from '../../utils'
import {updateTodo, unselectTodo, setNewDate} from '../../actions/board-actions'
import classNames from 'classnames'
import {bindActionCreators} from 'redux'
import './todo-details.css'


class TodoDetails extends Component{
    constructor(props){
        super(props)
        this.state = {menuAnchorElement: null, todoText: props.selectedTodo? props.selectedTodo.text : ""};

        this.submitTodoUpdate = this.submitTodoUpdate.bind(this)
        this.date = props.newDate || props.selectedTodo.date
    }

    handleClick = event => {
        this.setState({ menuAnchorElement: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ menuAnchorElement: null });
    };

    handleTodoTextChange = e => {
        this.setState({todoText: e.target.value})
    }

    submitTodoUpdate(id, text){
        const {updateTodo, unselectTodo, history} = this.props
        updateTodo(id, text, this.date, )
        unselectTodo()
        history.replace("/")
    }

    render(){
        const { menuAnchorElement, todoText } = this.state
        const { selectedTodoId, selectedTodo, newDate } = this.props
        const todoActionClasses = classNames("todo-details__action", {"todo-details__action--invisible": todoText === ""})
        return(
            <div className="todo-details">
                <nav className="todo-details__nav">
                    <Link to="/"><img src={BackIcon}/></Link>
                    <IconButton
                        aria-label="More"
                        aria-owns={menuAnchorElement ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        >
                        <MoreVertIcon style={{color: 'white'}}/>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={menuAnchorElement}
                        open={Boolean(menuAnchorElement)}
                        onClose={this.handleClose}
                        PaperProps={{
                            style: {
                            width: 200,
                            },
                        }}
                        >
                        <MenuItem onClick={this.handleClose}>
                            Delete
                        </MenuItem>
                    </Menu>
                </nav>
                <div className="todo-details__primary">
                    <h3>Task</h3>
                    <input type="text" value={todoText} onChange={this.handleTodoTextChange}/>
                </div>
                <div className={todoActionClasses} onClick={e=>{this.submitTodoUpdate(selectedTodoId, todoText)}}>
                    <img className="todo-details__action__image" src={GoIcon}/>
                </div>
                <div className="todo-details__secondary">
                    <Link to="/todo-date"><div className="todo-details__secondary__item">
                        <img src={CalendarIcon}  className="todo-details__secondary__item__icon"/>
                        <div className="todo-details__secondary__item__info">
                            <h3>Due date</h3>
                            <h4>{getMonDate(this.date)}</h4>
                        </div>
                    </div></Link>
                    <div className="todo-details__secondary__item">
                        <img src={FlagIcon}  className="todo-details__secondary__item__icon"/>
                        <div className="todo-details__secondary__item__info">
                            <h3>Priority</h3>
                            <h4>{selectedTodo? `Priority ${selectedTodo.priority}` : ""}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedTodoId: state.board.selectedTodoId,
        selectedTodo: state.board.selectedTodoId > 0? getSelectedTodo(state.board.allTodos, state.board.selectedTodoId) : null,
        newDate: state.board.newDate,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({updateTodo, unselectTodo}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoDetails)