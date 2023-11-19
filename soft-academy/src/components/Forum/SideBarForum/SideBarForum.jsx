import React, { useState, useEffect } from 'react';
import './forumSidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { SideBarPost } from './SideBarPost';
import { useForumContext } from '../../contexts/ForumContext';

export const SideBarForum = ({articles, closeSidebar, isOpen }) => {
    // const [isOpen, setIsOpen] = useState(false);

    const [posts, setPosts] = useState([])

    // const { forumPosts } = useForumContext()

    const navigate= useNavigate()
    useEffect(() => {


        setPosts(articles.sort((a, b) => (b._createdOn) - (a._createdOn)).slice(length - 1, 4))


       
    }, [articles]);


    return (
        <>
            
                    
                <div className={`forum-sidebar ${isOpen ? 'open' : ''}` } >
                <ul>
          <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
        </ul>
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



