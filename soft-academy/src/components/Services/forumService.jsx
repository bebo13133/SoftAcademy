import { requestFactory } from "./requester"
const baseUrl = `http://localhost:3030/data/forums`


export const forumServiceFactory=(token)=>{

const request = requestFactory(token)

const create = async (forumData) => {

    const result = await request.post(baseUrl, forumData)
    return result
}
return {
    // getAll,
    create,
    // getOne,
    // delete: deleteCourse,
    // update: updateCourse,
}
}