import { requestFactory } from "./requester"

const baseUrl = `http://localhost:3030/data/courses`

export const courseServiceFactory=(token)=>{
const request = requestFactory(token)

const getAll = async()=>{
const result = await request.get(baseUrl) 

const courses = Object.values(result)
return courses
}
const create = async(courseData)=>{

    const result = await request.post(baseUrl, courseData)
    return result
}

return {
    getAll,
    create,
    
}

}