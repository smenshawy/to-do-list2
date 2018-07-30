import {getTodayDate, filterTodosByDate, filterTodosByDone, filterTodosByDateAndDone, filterTodosByDateRangeAndDone, addDays, getDayMonDate, getWeekday, getMonDate} from '../utils'
import {getNext7DaysDates, getNext7DaysTodosGroups} from '../utils/board-utils'

const allTodos = [
    {id:1, text: 'todo1', done: false, date: getTodayDate(), priority: 1}, 
    {id:2, text: 'todo2', done: false, date: getTodayDate(), priority: 3}
]
const today = getTodayDate()

const initialState = {
    allTodos: allTodos, 
    allTodosCount: allTodos.length,
    doneTodosCount: filterTodosByDone(allTodos, true).length,
    inboxUndoneCount: filterTodosByDone(allTodos, false).length,
    todayUndoneCount: filterTodosByDateAndDone(allTodos, today, false).length,
    next7DaysUndoneCount: filterTodosByDateRangeAndDone(allTodos, getNext7DaysDates(), false).length,
    scopeId: 'INBOX', 
    scopeTitle: 'Inbox', 
    todosGroups: [{todos: allTodos}],
    selectedTodoId: 0,
    editDateOnly: false,
    newDate: null}

const board = (state = initialState, action) => {
    switch(action.type){
        case 'MARK_AS_DONE': {
            const newAllTodos = state.allTodos.map(todo => {
                if(todo.id === action.id)
                    return {...todo, done: true}
                else return todo
            })
            let todosGroups = state.todosGroups.map(todoGroup => {
                return {...todoGroup, todos: todoGroup.todos.filter(todo => todo.id !== action.id)}
            })
            return {...state, 
                allTodos: newAllTodos,
                allTodosCount: newAllTodos.length,
                doneTodosCount: filterTodosByDone(newAllTodos, true).length,
                inboxUndoneCount: filterTodosByDone(newAllTodos, false).length,
                todayUndoneCount: filterTodosByDateAndDone(newAllTodos, today, false).length,
                next7DaysUndoneCount: filterTodosByDateRangeAndDone(newAllTodos, getNext7DaysDates(), false).length,
                todosGroups: todosGroups,
            }
        }
        case 'UPDATE_TODO': {
            const newAllTodos = state.allTodos.map(todo => {
                if(todo.id === action.id)
                    return {...todo, text: action.text, date: action.date, priority: action.priority}
                else return todo
            })
            let todosGroups = []
            switch(state.scopeId){
                case 'INBOX': {
                    todosGroups = [{todos: filterTodosByDone(newAllTodos, false)}]
                    break
                }
                case 'TODAY': {
                    todosGroups = [{title: 'Today', subtitle: getDayMonDate(today), date: today, todos: filterTodosByDateAndDone(newAllTodos, today, false)}]
                    break
                }
                case 'NEXT_7_DAYS': {
                    todosGroups = getNext7DaysTodosGroups(newAllTodos)
                    break
                }

            }
            return {...state, 
                allTodos: newAllTodos,
                doneTodosCount: filterTodosByDone(newAllTodos, true).length,
                inboxUndoneCount: filterTodosByDone(newAllTodos, false).length,
                todayUndoneCount: filterTodosByDateAndDone(newAllTodos, today, false).length,
                next7DaysUndoneCount: filterTodosByDateRangeAndDone(newAllTodos, getNext7DaysDates(), false).length,
                todosGroups: todosGroups,
                editDateOnly: false,
            }
        }
        case 'UPDATE_TODO_DATE': {
            const newAllTodos = state.allTodos.map(todo => {
                if(todo.id === action.id)
                    {
                    return {...todo, date: action.date}
                    }
                else return todo
            })
            let todosGroups = []
            switch(state.scopeId){
                case 'INBOX': {
                    todosGroups = [{todos: filterTodosByDone(newAllTodos, false)}]
                    break
                }
                case 'TODAY': {
                    todosGroups = [{title: 'Today', subtitle: getDayMonDate(today), date: today, todos: filterTodosByDateAndDone(newAllTodos, today, false)}]
                    break
                }
                case 'NEXT_7_DAYS': {
                    todosGroups = getNext7DaysTodosGroups(newAllTodos)
                    break
                }

            }
            return {...state, 
                allTodos: newAllTodos,
                doneTodosCount: filterTodosByDone(newAllTodos, true).length,
                inboxUndoneCount: filterTodosByDone(newAllTodos, false).length,
                todayUndoneCount: filterTodosByDateAndDone(newAllTodos, today, false).length,
                next7DaysUndoneCount: filterTodosByDateRangeAndDone(newAllTodos, getNext7DaysDates(), false).length,
                todosGroups: todosGroups,
                editDateOnly: false,
            }
        }
        case 'SET_NEW_DATE': {
            return {
                ...state,
                newDate: action.date,
            }
        }
        case 'SELECT_TODO': {
            return {
                ...state,
                selectedTodoId: action.id
            }
        }
        case 'UNSELECT_TODO': {
            return {
                ...state,
                selectedTodoId: 0,
            }
        }
        case 'EDIT_DATE_ONLY': {
            return {
                ...state,
                editDateOnly: true,
            }
        }
        case 'EDIT_TODO': {
            return {
                ...state,
                editDateOnly: false,
            }
        }
        case 'SHOW_INBOX': {
            return {
                ...state,
                scopeId: 'INBOX', 
                scopeTitle: 'Inbox',
                todosGroups: [{todos: filterTodosByDone(state.allTodos, false)}],
            }
        }
        case 'SHOW_TODAY': {
            return {
                ...state,
                scopeId: 'TODAY',
                scopeTitle: 'Today',
                todosGroups: [{title: 'Today', subtitle: getDayMonDate(today), date: today, todos: filterTodosByDateAndDone(state.allTodos, today, false)}]
            }
        }
        case 'SHOW_NEXT7DAYS': {
            return {
                ...state,
                scopeId: 'NEXT_7_DAYS',
                scopeTitle: 'Next 7 Days',
                todosGroups: getNext7DaysTodosGroups(state.allTodos),
            }
        }
        default: {
            return state
        }
    }
}

export default board