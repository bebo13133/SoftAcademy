const forumReducer = (state = {forumPosts:[],errorMessage:""},action)=>{

    switch (action.type) {

        case 'SET_FORUM_POSTS':
            return {...state, forumPosts:action.payload};
        case 'SET_ERROR_MESSAGE_FORUMS':
            return {...state, errorMessage:action.payload};
            case 'DELETE_FORUM_POST':
                return { ...state, forumPosts: state.forumPosts.filter(post => post._id !== action.payload) };
                case 'EDIT_FORUM_POST':
                    return {
                        ...state,
                        forumPosts: state.forumPosts.map(post => (post._id === action.payload._id ? action.payload : post)),
                      };
            default: 
            return state
    }

}
export default forumReducer