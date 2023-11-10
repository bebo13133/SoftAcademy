import { courseServiceFactory } from "../Services/courseService";
import { createContext } from "react";
import { forumServiceFactory } from "../Services/forumService";


const forumContext= createContext()


export const ForumProvider=({children})=>{
const{token}=useAuthContext()
    const forumService= forumServiceFactory(token)


}