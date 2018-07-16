import React, {Component} from 'react'
import './todo.css'
import classNames from 'classnames'
import TickIcon from '../../icons/tick-icon.png'
import {markAsDone} from '../../actions/todos-actions'
import {connect} from 'react-redux'

class ToDo extends Component{

    constructor(props){
        super(props)
        
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)

        this.state = {xTouchStart: null, xTouchPrevious: null, xToucLatesthDiff: null, todoLeft: null, todoInvisible: null, todoAnimated: false,}
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

    render(){
        const {todoLeft, todoInvisible, todoAnimated} = this.state
        const {text, done, date, priority} = this.props
        const todoClasses = classNames("todo", "todo--priority" + priority, {"todo--animated": todoAnimated, "todo--invisible": todoInvisible})

        return(
            <div style={{position: 'relative'}}>
            <div 
                className={todoClasses}
                style={{left: todoLeft}} 
                onTouchStart={this.handleTouchStart} 
                onTouchMove={this.handleTouchMove} 
                onTouchEnd={this.handleTouchEnd}>
                <div className="todo__title">{text}</div>
                <div className="todo__date">{date}</div>
            </div>
            <div className="todo--done">
                <img className="todo--done__icon" src={TickIcon}/>
            </div>
            </div>
        )
    }
}

const mapDispatchToPerops = dispatch => {
    return {
        markAsDone: id => {
            dispatch(markAsDone(id))
        }
    }
}

export default connect(null, mapDispatchToPerops)(ToDo)