import {getMonDate, getTodayDate, addDays, compareDates} from './'

export function getSelectedTodoDate(allTodos, selectedTodoId){
    return allTodos.find(todo => todo.id === selectedTodoId).date
}

export function getSuggestedDate(allTodos){
    let suggestedDate = getTodayDate()
    while(allTodos.some(todo => compareDates(todo.date, suggestedDate))){
        suggestedDate = addDays(suggestedDate, 1)
    }
    return suggestedDate
}