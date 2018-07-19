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