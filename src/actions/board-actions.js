export const showInbox = () => {
    return {
        type: 'SHOW_INBOX'
    }
}

export const showToday = () => {
    return {
        type: 'SHOW_TODAY'
    }
}

export const showNext7Days = () => {
    return {
        type: 'SHOW_NEXT7DAYS'
    }
}

export const markAsDone = (id) =>{
    return {
        type: 'MARK_AS_DONE',
        id,
    }
}

export const updateTodoDate = (id, date) =>{
    return {
        type: 'UPDATE_TODO_DATE',
        id,
        date,
    }
}

export const updateTodo = (id, text, date, priority) =>{
    return {
        type: 'UPDATE_TODO',
        id,
        text,
        date,
        priority,
    }
}

export const setNewDate = (date) =>{
    return {
        type: 'SET_NEW_DATE',
        date,
    }
}

export const selectTodo = (id) =>{
    return {
        type: 'SELECT_TODO',
        id,
    }
}

export const unselectTodo = () =>{
    return {
        type: 'UNSELECT_TODO',
    }
}

export const editDateOnly = () => {
    return {
        type: 'EDIT_DATE_ONLY',
    }
}

export const editTodo = () => {
    return {
        type: 'EDIT_TODO',
    }
}