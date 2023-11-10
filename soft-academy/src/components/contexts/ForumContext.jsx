
import { createContext, useEffect, useState, useContext } from "react";
import { forumServiceFactory } from "../Services/forumService";
import { useAuthContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const forumContext = createContext()


export const ForumProvider = ({ children }) => {

    const [forumPosts, setForumPosts] = useState([])
    const { token } = useAuthContext()
    const forumService = forumServiceFactory(token)
    const navigate = useNavigate()

    useEffect(() => {
        forumService.getAll()
            .then(result => {
                setForumPosts(result)
            })


    }, [])
    console.log("forumPosts", forumPosts)
    const onPostSubmit = async (forumData) => {

        console.log(forumData)
        try {
            // if(!courseData.courseName ||
            // !courseData.firstName||
            // !courseData.lastName||
            // !courseData.email||
            // !courseData.ownerCourse||
            // !courseData.price||
            // !courseData.description||
            // !courseData.lectorDescription) return alert("Some field is empty")

            // if(courseData.courseName.length<4 || courseData.firstName.length<4 
            // || courseData.lastName.length<4 || courseData.email.length<9) return alert("Minimum field length is 4 for names and 9 for email")

            // if(courseData.lectorDescription.length<5 || courseData.description.length<5 ) return alert("Minimum field description length is 5")

            const newPost = await forumService.create(forumData)

            setForumPosts(state => [...state, newPost])
            navigate("/forum")

        } catch (err) {

            throw new Error(err.message || err)
        }

    }

    const contextForumValue = {
        onPostSubmit,
        forumPosts
    }



    return (
        <forumContext.Provider value={contextForumValue}>

            {children}

        </forumContext.Provider>


    )

}
export const useForumContext = () => {
    const context = useContext(forumContext);

    return context;
};