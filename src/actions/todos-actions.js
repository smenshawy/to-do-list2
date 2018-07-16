export const markAsDone = (id) =>{
    return {
        type: 'MARK_AS_DONE',
        id,
    }
}