import { courseServiceFactory } from "../Services/courseService";
import { createContext, useEffect, useState } from "react";
import { forumServiceFactory } from "../Services/forumService";


const forumContext= createContext()


export const ForumProvider=({children})=>{

    const [forumPosts,setForumPosts]=useState([])
const{token}=useAuthContext()
    const forumService= forumServiceFactory(token)

useEffect(()=>{
    forumService.getAll()
    .then(result => {
        setCourse(result)
    })


},[])
}