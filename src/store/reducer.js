const initialState = {
    todos:[],
};

const todoReducer = (state=initialState,action) => {
    switch(action.type){
        case 'LOADTODO':
            return {
                todos: action.payload
            }
        default:
             return state
    }
}

export default todoReducer;