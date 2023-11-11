import React, { useState, useEffect } from 'react';
import './forumSidebar.css';
import { Link } from 'react-router-dom';
import { SideBarPost } from './SideBarPost';
import { useForumContext } from '../../contexts/ForumContext';

export const SideBarForum = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [posts, setPosts] = useState([])

    const { forumPosts } = useForumContext()

    useEffect(() => {

      
        setPosts( forumPosts.sort((a, b) =>(b._createdOn) - (a._createdOn)).slice(length-1,5))

        const timeoutId = setTimeout(() => {
            setIsOpen(true);
        }, 500); 

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
           
            <div className={`forum-sidebar ${isOpen ? 'open' : ''}`}>
            <Link to="/add-new-post">Add New Post</Link>
       

                <h2>Latest Posts</h2>
                {posts && posts.map(post => <SideBarPost key={post._id} {...post} />)}
            </div>
        </>
    );
};



