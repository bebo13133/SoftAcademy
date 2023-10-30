import { requestFactory } from "./requester"



const baseUrl =`http://localhost:3030/data/comments`
const request = requestFactory()

export const createComment=async(courseId, comment)=>{
const result = await request.post(baseUrl,{courseId,comment})
return result

}
export const getAllComments = async(courseId) =>{
    const response = await request.get(`${baseUrl}?where=courseId%3D%22${courseId}%22`)
    const result = Object.values(response)
return result
}