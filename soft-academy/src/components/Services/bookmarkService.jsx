import { requestFactory } from "./requester"

const baseUrl =`http://localhost:3030/data/bookmarks`

const request = requestFactory()

export const createBookmark =async(courseId,userId)=>{
    // const {token} =useAuthContext()
    
    const result = await request.post(baseUrl, {courseId,userId})
    return result
    }

    export const deleteBookmark=(markId)=>{
   
  
        const result =  request.del(`${baseUrl}/${markId}`);
        return result 
        
        }
        export const getAllMarks= async() =>{
            const response = await request.get(`${baseUrl}`)
        
            const result = Object.values(response)
        return result
        }    