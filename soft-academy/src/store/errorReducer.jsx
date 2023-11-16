const errorReducer = (state = { errorMessage: '' }, action)  => {

    switch (action.type) {
        case 'SET_ERROR_MESSAGE':
            return { errorMessage: action.payload };
        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' };
        default: return state
    }
}
export default errorReducer;