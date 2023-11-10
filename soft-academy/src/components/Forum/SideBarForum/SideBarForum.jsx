import React, { useState, useEffect } from 'react';
import './forumSidebar.css';
import { Link } from 'react-router-dom';

export const SideBarForum = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsOpen(true);
        }, 500); // Променете времето според вашите предпочитания

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`forum-sidebar ${isOpen ? 'open' : ''}`}>
            {/* <div className="close-btn" onClick={closeSidebar}>
          &times;
        </div> */}
            <Link to="/add-new-post">Add New Post</Link>
            <h2>Latest Posts</h2>
            <ul>
                {/* {latestPosts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>
                            <img src={post.imageUrl} alt={post.title} />
                            <span>{post.title}</span>
                        </Link>
                    </li>
                ))} */}
            </ul>
        </div>
    );
};



