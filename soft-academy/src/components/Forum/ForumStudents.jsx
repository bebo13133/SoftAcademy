import React, { useState, useEffect } from 'react';
import './forumStudents.css'
import { SideBarForum } from './SideBarForum/SideBarForum';
import { OneForumPost } from './OneForumPost';
import { useForumContext } from '../contexts/ForumContext';

export const ForumStudents = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const { forumPosts } = useForumContext()
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    useEffect(() => {
        setArticles(forumPosts)
    }, []);



    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);



    return (
        <>


            <SideBarForum articles={articles} toggleSidebar={toggleSidebar} />



            <section>
                <div className="forum-page">
                    {/* <h1>Forum - All Articles</h1> */}
                    {currentPosts.map((article) => (
                        <OneForumPost key={article._id} {...article} />
                    ))}
                </div>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(articles.length / postsPerPage) }, (_, index) => (
                        <li key={index} >
                            <button className="pagination-button" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>

                        </li>
                    ))}
                </ul>
            </section>

        </>

    )
}