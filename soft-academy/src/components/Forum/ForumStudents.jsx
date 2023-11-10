import React, { useState, useEffect } from 'react';
import './forumStudents.css'
import { SideBarForum } from './SideBarForum/SideBarForum';
import { OneForumPost } from './OneForumPost';

export const ForumStudents = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    // const openSidebar = () => {
    //     setSidebarOpen(true);
    //   };

    //   const closeSidebar = () => {
    //     setSidebarOpen(false);
    //   };
    useEffect(() => {

    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };


    return (
        <>


            <SideBarForum articles={articles} toggleSidebar={toggleSidebar} />



            <section>

                <div className="forum-page">
                    <h1>Forum - All Articles</h1>
                    {/* {articles.map((article) => ( */}
                    <OneForumPost />
                    {/* ))} */}
                </div>
            </section>
        </>

    )
}