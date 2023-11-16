const forumReducer = (state = {forumPosts:[],errorMessage:""},action)=>{

    switch (action) {

        case 'SET_FORUM_POSTS':
            return {...state, forumPosts:action.payload};
        case 'SET_ERROR_MESSAGE':
            return {...state, errorMessage:action.payload};

            default: 
            return state
    }

}
export default forumReducer