import React, {Component} from 'react'
import './menu.css'
import InboxIcon from '../../icons/inbox-icon.png'
import TodayIcon from '../../icons/today-icon.png'
import WeekIcon from '../../icons/week-icon.png'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {toggleMenu} from '../../actions/menu-actions'
import {showInbox, showToday, showNext7Days} from '../../actions/board-actions'

class Menu extends Component{
    constructor(props){
        super(props)

        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
        this.handleInboxClick = this.handleInboxClick.bind(this)
        this.handleTodayClick = this.handleTodayClick.bind(this)
        this.handleNext7DaysClick = this.handleNext7DaysClick.bind(this)

        this.xTouchStart = null
        this.state = {xTouchStart: null, xTouchDiff: null, menuLeft: null, menuAnimated: false,}
        this.menuWidth = 300
    }

    componentWillReceiveProps(nextProps){
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
    handleInboxClick(e){
        this.props.showInbox()
        this.props.toggleMenu(false)
        e.stopPropagation()
    }
    handleTodayClick(e){
        this.props.showToday()
        this.props.toggleMenu(false)
        e.stopPropagation()
    }
    handleNext7DaysClick(e){
        this.props.showNext7Days()
        this.props.toggleMenu(false)
        e.stopPropagation()
    }
    render(){
        const {openMenu, board} = this.props
        const {menuLeft, menuAnimated} = this.state
        const menuClasses = classNames('menu', { 'menu--open': openMenu, 'menu--animated': menuAnimated });
        const inboxClasses = classNames('menu__item', {'menu__item--selected': board.scopeId === 'INBOX' })
        const todayClasses = classNames('menu__item', {'menu__item--selected': board.scopeId === 'TODAY' })
        const next7DaysClasses = classNames('menu__item', {'menu__item--selected': board.scopeId === 'NEXT_7_DAYS' })

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
                        <h5>{board.doneTodosCount}/{board.allTodosCount}</h5>
                    </div>
                </div>
                <div className={inboxClasses} onClick={this.handleInboxClick}>
                    <img src={InboxIcon} className="menu__item__icon"/>
                    <h3 className="menu__item__content">Inbox</h3>
                    <span>{board.inboxUndoneCount}</span>
                </div>
                <div className={todayClasses} onClick={this.handleTodayClick}>
                    <img src={TodayIcon} className="menu__item__icon"/>
                    <h3 className="menu__item__content">Today</h3>
                    <span>{board.todayUndoneCount}</span>
                </div>
                <div className={next7DaysClasses} onClick={this.handleNext7DaysClick}>
                    <img src={WeekIcon} className="menu__item__icon"/>
                    <h3 className="menu__item__content">Next 7 Days</h3>
                    <span>{board.next7DaysUndoneCount}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        openMenu: state.menu.open,
        board: state.board,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: (open) => {
            dispatch(toggleMenu(open))
        },
        showInbox: () => {
            dispatch(showInbox())
        },
        showToday: () => {
            dispatch(showToday())
        },
        showNext7Days: () => {
            dispatch(showNext7Days())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)