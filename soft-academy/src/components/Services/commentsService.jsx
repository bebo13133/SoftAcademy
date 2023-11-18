import { requestFactory } from "./requester"



const baseUrl =`http://localhost:3030/data/comments`
const baseUrl1 =`http://localhost:3030/data/commentsLikes`

const request = requestFactory()

export const createComment=async(courseId, comment,user)=>{
const result = await request.post(baseUrl,{courseId,comment,user})
return result

}
export const getAllComments = async(courseId) =>{
    const response = await request.get(`${baseUrl}?where=courseId%3D%22${courseId}%22`)
    const result = Object.values(response)
return result
}
export const deleteComment = async (forumId) => await request.del(`${baseUrl}/${forumId}`)


// =========== commentsLikes =========//
export const createLike = async (userId, commentId) => {
    const response = await request.post(`${baseUrl1}`, { userId, commentId })
    return response
}

export const getAllLikes = async () => {
    const response = await request.get(`${baseUrl1}`)

    const result = Object.values(response)
    return result
}
export const deleteLike = async (likeId) => {


    const result = await request.del(`${baseUrl1}/${likeId}`);
    return result

}