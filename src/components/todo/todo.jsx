import React, {Component} from 'react'
import './todo.css'
import classNames from 'classnames'
import TickIcon from '../../icons/tick-icon.svg'
import {markAsDone, selectTodo} from '../../actions/board-actions'
import {connect} from 'react-redux'

class ToDo extends Component{

    constructor(props){
        super(props)
        
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.state = {xTouchStart: null, xTouchPrevious: null, xToucLatesthDiff: null, todoLeft: null, todoInvisible: null, todoAnimated: false,}
    }

    componenWillReceiveProps(nextProps){
        if(nextProps !== this.props){

        }
    }

    handleTouchStart(e){
        this.setState({xTouchStart: e.touches[0].clientX, xTouchPrevious: e.touches[0].clientX, todoAnimated: false,})
        
    }
    handleTouchMove(e){
        let xTouchDownNew = e.touches[0].clientX;
        let todoLeft = xTouchDownNew - this.state.xTouchStart
        let xToucLatesthDiff = xTouchDownNew - this.state.xTouchPrevious
        if(todoLeft >=0 ){
            this.setState({todoLeft, xTouchPrevious: xTouchDownNew, xToucLatesthDiff})
        }
    }
    handleTouchEnd(e){
        const {id, markAsDone} = this.props
        if(this.state.xToucLatesthDiff > 0){
            this.setState({todoLeft: '100%', todoInvisible: true, todoAnimated: true})
            markAsDone(id)
        } else {
            this.setState({todoLeft: 0, todoAnimated: true})
        }
    }

    handleClick(e){
        const {id, selectTodo} = this.props
        selectTodo(id)
        e.stopPropagation()
    }

    render(){
        const {todoLeft, todoInvisible, todoAnimated} = this.state
        const {id, text, done, date, priority, board} = this.props
        const todoClasses = classNames("todo",
        {"todo--invisible": todoInvisible})
        const todoUndoneClasses = classNames("todo__undone", 
            "todo__undone--priority" + priority, 
            {"todo__undone--animated": todoAnimated, 
            "todo__undone--invisible": todoInvisible,
            "todo__undone--selected": id === board.selectedTodoId})

        return(
            <div className={todoClasses}>
                <div className="todo__done">
                    <img className="todo__done__icon" src={TickIcon}/>
                </div>
                <div 
                    className={todoUndoneClasses}
                    style={{left: todoLeft}} 
                    onTouchStart={this.handleTouchStart} 
                    onTouchMove={this.handleTouchMove} 
                    onTouchEnd={this.handleTouchEnd}
                    onClick={this.handleClick}>
                    <h3 className="todo__undone__title">{text}</h3>
                    <span className="todo__undone__date">{date.toLocaleDateString()}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.board,
    }
}

const mapDispatchToPerops = dispatch => {
    return {
        markAsDone: id => {
            dispatch(markAsDone(id))
        },
        selectTodo: id => {
            dispatch(selectTodo(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPerops)(ToDo)