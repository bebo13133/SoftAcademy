
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
    const [forumSearch, setForumSearch] = useState([])

    const forumPosts = useSelector(state => state.forumReducer.forumPosts);


    useEffect(() => {
        forumService.getAll()
            .then(result => {
                dispatch({ type: 'SET_FORUM_POSTS', payload: result });
            })
            .catch(error => {
                dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: error.message || 'An error occurred' });
            });

    }, [dispatch])

    const selectForum =(forumId) => {

  return forumPosts.find(x => x._id === forumId)
// console.log("forumPosts1",result)

    }

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

        try {
            const deletePost = await forumService.delete(forumId)

            dispatch(deleteForumPost(forumId))

            navigate("/forum")
        } catch (err) {
            dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: err.message || 'An error occurred' });
        }

    }

    const onDeleteForumAdmin = async (forumId) => {

        try {
            const deletePost = await forumService.delete(forumId)
            dispatch(deleteForumPost(forumId))

            navigate("/admin/all-forums")

        } catch (err) {
            dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: err.message || 'An error occurred' });
        }
    }


    const onEditSubmitPost = async (forumData) => {
        if (!forumData.title || !forumData.description || !forumData.author) {


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
    const onEditSubmitAdmin = async (forumData) => {
        if (!forumData.title || !forumData.description || !forumData.author) {


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
            navigate(`/admin/all-forums`)
        } catch (err) {
            dispatch({ type: 'SET_ERROR_MESSAGE_FORUMS', payload: err.message || 'An error occurred' });
        }
    };
    const onSearchSubmitAdminForum = async (data) => {

        try {
            const result = await forumService.getAll()

            if (!data.searchTerm || data.searchCriteria === "all") {
                setForumSearch(result)
            }
            if (data.searchCriteria == "id") {
                setForumSearch(result.filter(x => x._id.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }
            if (data.searchCriteria == "author") {
                setForumSearch(result.filter(x => x.author.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }
            if (data.searchCriteria == "name") {
                setForumSearch(result.filter(x => x.title.toLowerCase().includes(data.searchTerm.toLowerCase())));
            }
            navigate("/admin/search-forum")
        } catch (error) {
            console.log(error.message || error);


        }
    }



    const contextForumValue = {
        onPostSubmit,
        forumPosts,
        onDeleteClick,
        onEditSubmitPost,
        onDeleteForumAdmin,
        onEditSubmitAdmin,
        onSearchSubmitAdminForum,
        forumSearch,
        selectForum

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