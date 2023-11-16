import React, { useState, useEffect } from 'react';
import './forumStudents.css'
import { SideBarForum } from './SideBarForum/SideBarForum';
import { OneForumPost } from './OneForumPost';
import { useForumContext } from '../contexts/ForumContext';
import Footer from '../Footer/Footer';
import { IsLoading } from '../IsLoading/IsLoading';

export const ForumStudents = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log(isSidebarOpen)
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { forumPosts } = useForumContext()

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    useEffect(() => {

        setArticles(forumPosts)
        setLoading(false)
    }, []);



    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        console.log("hi")
        setIsSidebarOpen(false);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);



    return (
        <>

            <SideBarForum articles={articles}
                // toggleSidebar={toggleSidebar} 
                closeSidebar={closeSidebar} isOpen={isSidebarOpen} />

            {isLoading ? <IsLoading /> : (<>
                <section className="forum-page-section">
                    <button className="close-button1" onClick={openSidebar}>Open Sidebar</button>

                    <div className="forum-page">

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
                <Footer />
            </>)}





        </>

    )
}