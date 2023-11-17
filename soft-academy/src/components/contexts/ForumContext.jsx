
import { createContext, useEffect, useState, useContext } from "react";
import { forumServiceFactory } from "../Services/forumService";
import { useAuthContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteForumPost, editForumPost, setError } from "../actions";
import './error.css';

const forumContext = createContext()


export const ForumProvider = ({ children }) => {


    const { token } = useAuthContext()
    const forumService = forumServiceFactory(token)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.errorReducer.errorMessage);

    const forumPosts = useSelector(state => state.forumReducer.forumPosts);
   

    useEffect(() => {
        forumService.getAll()
            .then(result => {
                dispatch({ type: 'SET_FORUM_POSTS', payload: result });
            })
            .catch(error => {
                dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: error.message || 'An error occurred' });
            });

    }, [])

    const onPostSubmit = async (forumData) => {

        try {

            if (!forumData.title || !forumData.description || !forumData.author || !forumData.imageUrl) {


                dispatch(setError("Some fields is empty"));
                setTimeout(() => {
                    dispatch(setError(''));
                }, 4000);
                return
            }

            if (forumData.author.length < 4 || forumData.title.length < 4) {

                dispatch(setError("Minimum field length is 4"));
                setTimeout(() => {
                    dispatch(setError(''));
                }, 4000);
                return
            }
            if (forumData.description.length < 40) {



                dispatch(setError("Minimum description length is 40"));
                setTimeout(() => {
                    dispatch(setError(''));
                }, 4000);
                return
            }

            const newPost = await forumService.create(forumData)

            dispatch({ type: 'SET_FORUM_POSTS', payload: [...forumPosts, newPost] })
            navigate("/forum")

        } catch (err) {

            dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: err.message || 'An error occurred' });
        }

    }

    const onDeleteClick = async (forumId) => {
        const deletePost = await forumService.delete(forumId)

        dispatch(deleteForumPost(forumId))

        navigate("/forum")
        try {

        } catch (err) {
            dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: err.message || 'An error occurred' });
        }

    }

    const onEditSubmitPost = async (forumData) => {
        if (!forumData.title || !forumData.description || !forumData.author || !forumData.imageUrl) {


            dispatch(setError("Some fields is empty"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }

        if (forumData.author.length < 4 || forumData.title.length < 4) {

            dispatch(setError("Minimum field length is 4"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }
        if (forumData.description.length < 40) {



            dispatch(setError("Minimum description length is 40"));
            setTimeout(() => {
                dispatch(setError(''));
            }, 4000);
            return
        }


        try {
        

            const post = await forumService.update(forumData._id, forumData)

            dispatch(editForumPost(forumData, post))
            navigate(`/forum/${forumData._id}`)
        } catch (err) {
            dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: err.message || 'An error occurred' });
        }
    };




    const contextForumValue = {
        onPostSubmit,
        forumPosts,
        onDeleteClick,
        onEditSubmitPost,

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