import { requestFactory } from "./requester"
const baseUrl = `http://localhost:3030/data/forums`


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
const updateForumPost = async (forumId,forumData) =>request.put(`${baseUrl}/${forumId}`,forumData)
 

    return {
        getAll,
        create,
        getOne,
        delete: deletePost,
        update: updateForumPost,
    }
}