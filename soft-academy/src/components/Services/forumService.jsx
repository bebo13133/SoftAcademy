import { requestFactory } from "./requester"
const baseUrl = `http://localhost:3030/data/forums`
const baseUrl2 = `http://localhost:3030/data/forumComments`
const baseUrl3 = `http://localhost:3030/data/forumLikes`
export const forumServiceFactory = (token) => {

    const request = requestFactory(token)

    const getAll = async () => {
        const result = await request.get(baseUrl)

        const posts = Object.values(result)
        return posts
    }


    const create = async (forumData) => {

        const result = await request.post(baseUrl, forumData)
        return result
    }
    const getOne = async (forumId) => {
        const onePost = await request.get(`${baseUrl}/${forumId}`)

        return onePost
    }

    const deletePost = async (forumId) => request.del(`${baseUrl}/${forumId}`)



    const updateForumPost = async (forumId, forumData) => request.put(`${baseUrl}/${forumId}`, forumData)



    // ===============COMMENTS =============//
    const getAllPosts = async (forumId) => {
        const response = await request.get(`${baseUrl2}?where=forumId%3D%22${forumId}%22`)
        const result = Object.values(response)
       
        return result
        
    }
    const deleteComment = async (forumId) => await request.del(`${baseUrl2}/${forumId}`)
    
    const createPost = async (forumId, comment, user) => {
        const result = await request.post(`${baseUrl2}`, { forumId, comment, user })

        return result
    }

// ------------------ LIKES --------------------------------//
    const createLike = async (userId, commentId) => {
        const response = await request.post(`${baseUrl3}`, { userId, commentId })
        return response
    }

    const getAllLikes = async () => {
        const response = await request.get(`${baseUrl3}`)

        const result = Object.values(response)
        return result
    }
    const deleteLike=async(likeId)=>{
   
  
        const result = await request.del(`${baseUrl3}/${likeId}`);
        return result 
        
        }
    



    return {
        getAll,
        create,
        getOne,
        delete: deletePost,
        update: updateForumPost,
        createPost,
        getAllPosts,
        deleteComment,
        createLike,
        getAllLikes,
        deleteLike
    }
}