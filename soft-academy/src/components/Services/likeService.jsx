import { useAuthContext } from "../contexts/UserContext"
import { requestFactory } from "./requester"

 const request = requestFactory()


const baseUrl =`http://localhost:3030/data/likes`

export const getAllLikes= async() =>{
    const response = await request.get(`${baseUrl}`)

    const result = Object.values(response)
return result
}
export const createLike=async(courseId,userId)=>{
// const {token} =useAuthContext()

const result = await request.post(baseUrl, {courseId,userId})
return result

}



export const deleteBookmark=(markId)=>{
   
  
    const result =  request.del(`${baseUrl}/${markId}`);
    return result 
    
    }
