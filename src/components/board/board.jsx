import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToDosGroup from '../../components/todos-group/todos-group'
import Menu from '../../components/menu/menu'
import BurgerIcon from  '../../icons/burger-icon.png'
import './board.css'
import {toggleMenu} from '../../actions/menu-actions'

class Board extends Component{
    constructor(props){
        super(props)
        this.handleBurgerClick = this.handleBurgerClick.bind(this)
        this.handleBoardClick = this.handleBoardClick.bind(this)
    }

    handleBurgerClick(e){
        this.props.toggleMenu(true)
        e.stopPropagation()
    }
    handleBoardClick(){
        this.props.toggleMenu(false)
    }
    render(){
        const {board, toggleMenu} = this.props
        return(
            <div className="board" onClick={this.handleBoardClick}>
                <Menu/>
                <div className="board__header">
                    <img className="board__header__icon" src={BurgerIcon} onClick={this.handleBurgerClick}/>
                    <h3 className="board__header__content">{board.scopeTitle}</h3>
                </div>
                {board.todosGroups.map(({id, title, subtitle, date, todos}) => 
                    <ToDosGroup key={id || date || 0} title={title} subtitle={subtitle} date={date} todos={todos}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.board,
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