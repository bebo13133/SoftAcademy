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
    return {
        getAll,
        create,
        // getOne,
        // delete: deleteCourse,
        // update: updateCourse,
    }
}