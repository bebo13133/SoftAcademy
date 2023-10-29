import { requestFactory } from "./requester"
const baseUrl = `http://localhost:3030/users`

export const userServiceFactory = (token)=>{

    const requester = requestFactory(token)

    return {
        login:(data)=>requester.post(`${baseUrl}/login`,data),
        register:(data)=>requester.post(`${baseUrl}/register`,data),
        logout:(token)=>requester.post(`${baseUrl}/logout`)
    }
  


}