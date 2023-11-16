import React, { useState, useEffect } from 'react';
import './forumSidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { SideBarPost } from './SideBarPost';
import { useForumContext } from '../../contexts/ForumContext';

export const SideBarForum = ({ closeSidebar, isOpen }) => {
    // const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState([])

    const { forumPosts } = useForumContext()
    const navigate= useNavigate()
    useEffect(() => {


        setPosts(forumPosts.sort((a, b) => (b._createdOn) - (a._createdOn)).slice(length - 1, 4))


        return () => clearTimeout(timeoutId);
    }, []);


    return (
        <>
            
                    
                <div className={`forum-sidebar ${isOpen ? 'open' : ''}` } >
                <button className="close-button1" onClick={() => navigate('/add-new-post')}>Add New Post</button>
                <button className="close-button1" onClick={closeSidebar} >
                    Close Sidebar
                </button>
                <h2>Latest Posts</h2>
                {posts && posts.map(post => <SideBarPost key={post._id} {...post} />)}
            </div>
     

        </>
    );
};



