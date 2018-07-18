import {getTodayDate, filterTodosByDate, filterTodosByDone, filterTodosByDateAndDone, filterTodosByDateRangeAndDone, addDays, getDayMonDate, getWeekday, getMonDate} from '../utils'

const allTodos = [
    {id:1, text: 'todo1', done: false, date: getTodayDate(), priority: 1}, 
    {id:2, text: 'todo2', done: false, date: getTodayDate(), priority: 3}
]
const today = getTodayDate()
const tomorrow = addDays(today, 1)
const day3 = addDays(today, 2)
const day4 = addDays(today, 3)
const day5 = addDays(today, 4)
const day6 = addDays(today, 5)
const day7 = addDays(today, 6)

const initialState = {
    allTodos: allTodos, 
    allTodosCount: allTodos.length,
    doneTodosCount: filterTodosByDone(allTodos, true).length,
    inboxUndoneCount: filterTodosByDone(allTodos, false).length,
    todayUndoneCount: filterTodosByDateAndDone(allTodos, today, false).length,
    next7DaysUndoneCount: filterTodosByDateRangeAndDone(allTodos, [today, tomorrow, day3, day4, day5, day6, day7], false).length,
    scopeId: 'INBOX', 
    scopeTitle: 'Inbox', 
    todosGroups: [{todos: allTodos}]}

const board = (state = initialState, action) => {
    switch(action.type){
        case 'MARK_AS_DONE': {
            const newAllTodos = state.allTodos.map(todo => {
                if(todo.id === action.id)
                    return {...todo, done: true}
                else return todo
            })
            return {...state, 
                allTodos: newAllTodos,
                allTodosCount: newAllTodos.length,
                doneTodosCount: filterTodosByDone(newAllTodos, true).length,
                inboxUndoneCount: filterTodosByDone(newAllTodos, false).length,
                todayUndoneCount: filterTodosByDateAndDone(newAllTodos, today, false).length,
                next7DaysUndoneCount: filterTodosByDateRangeAndDone(newAllTodos, [today, tomorrow, day3, day4, day5, day6, day7], false).length,
            }
        }
        case 'SHOW_INBOX': {
            return {
                ...state,
                scopeId: 'INBOX', 
                scopeTitle: 'Inbox',
                todosGroups: [{todos: filterTodosByDone(state.allTodos)}],
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

            let next7Days= [{title: 'Today', subtitle: getDayMonDate(today), date: today, todos: filterTodosByDateAndDone(state.allTodos, today, false)},
                {title: 'Tomorrow', subtitle: getDayMonDate(tomorrow), date: tomorrow, todos: filterTodosByDateAndDone(state.allTodos, tomorrow, false)},
                {title: getWeekday(day3), subtitle: getMonDate(day3), date: day3, todos: filterTodosByDateAndDone(state.allTodos, day3, false)},
                {title: getWeekday(day4), subtitle: getMonDate(day4), date: day4, todos: filterTodosByDateAndDone(state.allTodos, day4, false)},
                {title: getWeekday(day5), subtitle: getMonDate(day5), date: day5, todos: filterTodosByDateAndDone(state.allTodos, day5, false)},
                {title: getWeekday(day6), subtitle: getMonDate(day6), date: day6, todos: filterTodosByDateAndDone(state.allTodos, day6, false)},
                {title: getWeekday(day7), subtitle: getMonDate(day7), date: day7, todos: filterTodosByDateAndDone(state.allTodos, day7, false)},
            ]
            return {
                ...state,
                scopeId: 'NEXT_7_DAYS',
                scopeTitle: 'Next 7 Days',
                todosGroups: next7Days,
            }
        }
        default: {
            return state
        }
    }
}

export default board