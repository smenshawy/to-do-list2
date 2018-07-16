import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToDo from '../../components/todo/todo'
import Menu from '../../components/menu/menu'
import BurgerIcon from  '../../icons/burger-icon.png'
import './board.css'
import {toggleMenu} from '../../actions/menu-actions'

class Board extends Component{
    constructor(props){
        super(props)
        this.state = {openMenu: false}
        this.handleBurgerClick = this.handleBurgerClick.bind(this)
    }

    handleBurgerClick(){
        this.props.toggleMenu(true)
    }
    render(){
        const {todos} = this.props
        return(
            <div className="board">
                <div className="board__header">
                    <img className="board__header__icon" src={BurgerIcon} onClick={this.handleBurgerClick}/>
                    <h3 className="board__header__content">Inbox</h3>
                </div>
                {todos.map(({id, text, done, date, priority}) => {return (
                    <ToDo key={id} id={id} text={text} done={done} date={date} priority={priority}/>
                )})}
                <Menu/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos,
        openMenu: state.menu.open,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: (open) => {
            dispatch(toggleMenu(open))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)