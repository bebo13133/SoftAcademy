import { requestFactory } from "./requester"
// const baseUrl = `http://localhost:3005/users`
const baseUrl2 = `http://localhost:3030/users`


export const userServiceFactory = (token)=>{

    const requester = requestFactory(token)

    return {

        getAll:()=>{
          return requester.get(`${baseUrl2}/users`)
        },
        login:(data)=>{
          // requester.post(`${baseUrl}/login`,data)
      return  requester.post(`${baseUrl2}/login`,data)
        },
        register:(data)=>{
          // requester.post(`${baseUrl}/register`,data)
       return requester.post(`${baseUrl2}/register`,data)
        },
        logout:(token)=>{
          // requester.post(`${baseUrl}/logout`)
        return  requester.post(`${baseUrl2}/logout`)

        },
        changePassword: (userId, oldPassword, newPassword) =>{
      return requester.patch(`${baseUrl2}/updatePassword/${userId}/update`,{oldPassword, password: newPassword})
    },
     getMe: (newPassword)=>{
      return requester.patch(`${baseUrl2}/me/password`,{newPassword})
     }   
    }
  


}

