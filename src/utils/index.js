export function addDays(startDate, days) {
    let newDate = new Date()
    newDate.setDate(startDate.getDate() + days)
    return newDate
}

export function getWeekday(date){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
}

export function getMonDate(date){
    if(!date) return null
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[date.getMonth()] + ' ' + date.getDate()
}

export function getDayMonDate(date){
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate()
}

export function getTodayDate(){
    return new Date(new Date().toDateString())
}

export function getTomorrowDate(){
    return addDays(getTodayDate(), 1)
}

export function getNextWeekDate(){
    return addDays(getTodayDate(), 7)
}

export function compareDates(date1, date2){
    return date1.getDate() === date2.getDate() 
        && date1.getMonth() === date2.getMonth()
        && date1.getYear() === date2.getYear()
}

export function filterTodosByDate(allTodos, date){
    return allTodos.filter(todo => compareDates(todo.date, date))
}

export function filterTodosByDone(allTodos, done){
    return allTodos.filter(todo => todo.done === done)
}

export function filterTodosByDateAndDone(allTodos, date, done){
    return allTodos.filter(todo => compareDates(todo.date, date) && todo.done === done)
}

export function filterTodosByDateRangeAndDone(allTodos, dateRange, done){
    return allTodos.filter(todo => dateRange.some(date => compareDates(todo.date, date)) && todo.done === done)
}