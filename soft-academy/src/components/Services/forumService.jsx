import { requestFactory } from "./requester"
const baseUrl = `http://localhost:3030/data/forums`
const baseUrl2 = `http://localhost:3030/data/forumComments`
const baseUrl3 = `http://localhost:3030/data/forumLikes`
const baseUrl4 = `http://localhost:3030/data/oneforumLikes`
const baseUrl5 = `http://localhost:3030/data/promoCodes`
const baseUrl6 = `http://localhost:3030/data/projects`

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
    const deleteLike = async (likeId) => {


        const result = await request.del(`${baseUrl3}/${likeId}`);
        return result

    }
    
    // ===============One forum like --------------------//
    const createForumLike = async (userId, forumId) => {
        const response = await request.post(`${baseUrl4}`, { userId, forumId })
        return response
    }

    const getAllForumLikes = async () => {
        const response = await request.get(`${baseUrl4}`)

        const result = Object.values(response)
        return result
    }
    const deleteForumLike = async (likeId) => {


        const result = await request.del(`${baseUrl4}/${likeId}`);
        return result

    }
// ============== Projects=================//
const createProject = async (projectData) => {

    const result = await request.post(baseUrl6, projectData)
    return result
}
const getAllProjects = async () => {
    const result = await request.get(baseUrl6)

    const projects = Object.values(result)
    return projects
}
const getOneProject= async (projectId) => {
    const onePost = await request.get(`${baseUrl6}/${projectId}`)

    return onePost
}

const updateProject =async (projectId, projectData) => request.put(`${baseUrl6}/${projectId}`, projectData)


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
        deleteLike,
        createForumLike,
        getAllForumLikes,
        deleteForumLike,
        createProject,
        getAllProjects,
        getOneProject,
        updateProject
    
    }
}