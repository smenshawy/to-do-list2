const menu = (state = {open: false}, action) => {
    switch(action.type){
        case 'TOGGLE_MENU': {
            return {open: action.open}
        }
        default: {
            return state
        }
    }
}

export default menu