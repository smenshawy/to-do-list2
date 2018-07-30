import {getTodayDate, addDays, getMonDate, getDayMonDate, filterTodosByDateAndDone, getWeekday} from './'


const today = getTodayDate()
const tomorrow = addDays(today, 1)
const day3 = addDays(today, 2)
const day4 = addDays(today, 3)
const day5 = addDays(today, 4)
const day6 = addDays(today, 5)
const day7 = addDays(today, 6)
export function getNext7DaysDates(){
    return [today, tomorrow, day3, day4, day5, day6, day7]
}
export function getNext7DaysTodosGroups(allTodos){
    return [{title: 'Today', subtitle: getDayMonDate(today), date: today, todos: filterTodosByDateAndDone(allTodos, today, false)},
        {title: 'Tomorrow', subtitle: getDayMonDate(tomorrow), date: tomorrow, todos: filterTodosByDateAndDone(allTodos, tomorrow, false)},
        {title: getWeekday(day3), subtitle: getMonDate(day3), date: day3, todos: filterTodosByDateAndDone(allTodos, day3, false)},
        {title: getWeekday(day4), subtitle: getMonDate(day4), date: day4, todos: filterTodosByDateAndDone(allTodos, day4, false)},
        {title: getWeekday(day5), subtitle: getMonDate(day5), date: day5, todos: filterTodosByDateAndDone(allTodos, day5, false)},
        {title: getWeekday(day6), subtitle: getMonDate(day6), date: day6, todos: filterTodosByDateAndDone(allTodos, day6, false)},
        {title: getWeekday(day7), subtitle: getMonDate(day7), date: day7, todos: filterTodosByDateAndDone(allTodos, day7, false)},]
}

export function getSelectedTodo(allTodos, selectedTodoId){
    return allTodos.find(todo => todo.id === selectedTodoId)
}
