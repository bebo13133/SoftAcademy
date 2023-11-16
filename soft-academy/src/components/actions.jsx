export const deleteForumPost=(postId)=>({
    type: 'DELETE_FORUM_POST',
    payload: postId,
})
export const editForumPost = (forumData)=>({
    type: 'EDIT_FORUM_POST',
    payload: forumData,
})
export const setError = (errorMessage) => ({
    type: 'SET_ERROR_MESSAGE',
    payload: errorMessage,
  });