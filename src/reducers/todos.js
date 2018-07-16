const initialState = [
    {id:1, text: 'todo1', done: false, date: '2018/07/12', priority: 1}, 
    {id:2, text: 'todo2', done: false, date: '2018/07/12', priority: 3}
]
const todos = (state = initialState, action) => {
    switch(action.type){
        case 'MARK_AS_DONE': {
            return state.map(todo => {
                if(todo.id === action.id)
                    return {...todo, done: true}
                else return todo
            })
        }
        default: {
            return state
        }
    }
}

export default todos