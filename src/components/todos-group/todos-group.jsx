import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToDo from '../../components/todo/todo'
import './todos-group.css'
import {getTodayDate, compareDates} from '../../utils'
import { CSSTransitionGroup } from 'react-transition-group'

class TodosGroup extends Component{
    constructor(props){
        super(props)
        this.state = {openMenu: false}
        this.handleBurgerClick = this.handleBurgerClick.bind(this)
    }

    handleBurgerClick(){
        this.props.toggleMenu(true)
    }
    render(){
        const {board, id, title, subtitle, date, todos} = this.props
        return(
            <div className="todos-group">
                {board.scopeId !== 'INBOX' && <div className="todos-group__header">
                    <h4 className='todos-group__header__title'>{title}</h4>
                    <span className='todos-group__header__subtitle'>{subtitle}</span>
                </div>}

                <CSSTransitionGroup
                transitionName="todo"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                    {todos.map(({id, text, done, date, priority}) => {return (
                        <ToDo key={id} id={id} text={text} done={done} date={date} priority={priority}/>
                    )})}
                </CSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.board,
    }
}

export default connect(mapStateToProps)(TodosGroup)