import React, {Component} from 'react'
import './menu.css'
import InboxIcon from '../../icons/inbox-icon.png'
import TodayIcon from '../../icons/today-icon.png'
import WeekIcon from '../../icons/week-icon.png'
import ProgressIcon from '../../icons/progress-icon.svg'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {toggleMenu} from '../../actions/menu-actions'

class Menu extends Component{
    constructor(props){
        super(props)

        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)

        this.xTouchStart = null
        this.state = {xTouchStart: null, xTouchDiff: null, menuLeft: null, menuAnimated: false,}
        this.menuWidth = 300
    }

    componentWillUpdate(nextProps){
        if(nextProps.openMenu !== this.props.openMenu){
            if(nextProps.openMenu){
                this.setState({menuLeft: 0, menuAnimated: true})
            } else {
                this.setState({menuLeft: -1 * this.menuWidth, menuAnimated: true})
            }
        }
    }

    handleTouchStart(e){
        this.setState({xTouchStart: e.touches[0].clientX, menuAnimated: false,})
        
    }
    handleTouchMove(e){
        let xTouchDownNew = e.touches[0].clientX;
        let xTouchDiff = this.state.xTouchStart - xTouchDownNew
        this.setState({xTouchDiff: xTouchDiff})
        let menuLeft = 0 - xTouchDiff
        if(menuLeft >= -1 * this.menuWidth && menuLeft <= 0){
            this.setState({menuLeft})
        }
    }
    handleTouchEnd(e){
        let menuHalfWidth = this.menuWidth / 2
        if(this.state.menuLeft > -1 * menuHalfWidth){
            this.setState({menuLeft: 0, menuAnimated: true})
            this.props.toggleMenu(true)
        } else {
            this.props.toggleMenu(false)
        }
    }
    render(){
        const {openMenu, todosCount, todosDoneCount, todosUndoneCount} = this.props
        const {menuLeft, menuAnimated} = this.state
        const menuClasses = classNames('menu', { 'menu--open': openMenu, 'menu--animated': menuAnimated });

        return(
            <div 
                className={menuClasses} 
                style={{left: menuLeft}} 
                onTouchStart={this.handleTouchStart} 
                onTouchMove={this.handleTouchMove} 
                onTouchEnd={this.handleTouchEnd}>
                <div className="menu__header">
                    <h1 className="menu__header__initial">S</h1>
                    <div className="menu__header__info">
                        <h3>sherif.menshawy</h3>
                        <h5>{todosDoneCount}/{todosCount}</h5>
                    </div>
                </div>
                <div className="menu__item menu__item--selected">
                    <img src={InboxIcon} className="menu__item__icon"/>
                    <h3 className="menu__item__content">Inbox</h3>
                    <span>{todosUndoneCount}</span>
                </div>
                <div className="menu__item">
                    <img src={TodayIcon} className="menu__item__icon"/>
                    <h3 className="menu__item__content">Today</h3>
                    <span>0</span>
                </div>
                <div className="menu__item">
                    <img src={WeekIcon} className="menu__item__icon"/>
                    <h3 className="menu__item__content">Next 7 Days</h3>
                    <span>0</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todosCount: state.todos.length,
        todosDoneCount: state.todos.filter(todo => todo.done).length,
        todosUndoneCount: state.todos.filter(todo => !todo.done).length,
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu)