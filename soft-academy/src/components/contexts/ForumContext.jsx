
import { createContext, useEffect, useState, useContext } from "react";
import { forumServiceFactory } from "../Services/forumService";
import { useAuthContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import './error.css';

const forumContext = createContext()


export const ForumProvider = ({ children }) => {

    const [forumPosts, setForumPosts] = useState([])
    const [errorMessage, setErrorMessage] = useState(''); //error messages
    const { token } = useAuthContext()
    const forumService = forumServiceFactory(token)
    const navigate = useNavigate()

    useEffect(() => {
        forumService.getAll()
            .then(result => {
                setForumPosts(result)
            })


    }, [])

    const onPostSubmit = async (forumData) => {


        try {

            if (!forumData.title || !forumData.description || !forumData.author || !forumData.imageUrl) { 
                setErrorMessage("Some fields is empty")
            
                setTimeout(() => {
                    setErrorMessage('');
                  }, 4000);
            
                  return;
            }


            if (forumData.author.length < 4
                || forumData.description.length < 4
                || forumData.title.length < 4){

                     setErrorMessage("Minimum field length is 4 for names")
                    setTimeout(() => {
                        setErrorMessage('');
                      }, 4000);
                
                      return;
                }

            const newPost = await forumService.create(forumData)

            setForumPosts(state => [...state, newPost])
            navigate("/forum")

        } catch (err) {

            throw new Error(err.message || err)
        }

    }

    const onDeleteClick = async (forumId) => {
        const deletePost = await forumService.delete(forumId)

        setForumPosts(state => state.filter(x => x._id !== forumId))

        navigate("/forum")
        try {

        } catch (err) {
            throw new Error(err.message || err)
        }

    }

    const onEditSubmitPost = async (forumData) => {


        try {
            if (!forumData.title || !forumData.description || !forumData.author || !forumData.imageUrl){
                setErrorMessage("Some fields is empty")
                setErrorMessage("Minimum field length is 4")
                setTimeout(() => {
                    setErrorMessage('');
                  }, 4000);
            
                  return;
            }
            
   

            if (forumData.author.length < 4
                || forumData.description.length < 4
                || forumData.title.length < 4){

                    setErrorMessage("Minimum field length is 4")
                    setTimeout(() => {
                        setErrorMessage('');
                      }, 4000);
                
                      return;
                }

            const result = await forumService.update(forumData._id, forumData)
            setForumPosts(state => state.map(x => x._id === forumData._id ? result : x))
            navigate(`/forum/${forumData._id}`)
        } catch (err) {

        }
    }


    const contextForumValue = {
        onPostSubmit,
        forumPosts,
        onDeleteClick,
        onEditSubmitPost
    }



    return (
        <forumContext.Provider value={contextForumValue}>

            {children}
    {errorMessage && (
        <div className={`error-message ${errorMessage && 'show-error custom-style'}`}>
          <p>{errorMessage}</p>
        </div>
      )}
        </forumContext.Provider>


    )

}

export const useForumContext = () => {
    const context = useContext(forumContext);

    return context;
};