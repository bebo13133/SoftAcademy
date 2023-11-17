import React, { useState, useEffect,lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './forumStudents.css'
import { SideBarForum } from './SideBarForum/SideBarForum';
import OneForumPost  from './OneForumPost';
import { forumServiceFactory } from "../Services/forumService";

import Footer from '../Footer/Footer';
import { IsLoading } from '../IsLoading/IsLoading';

export const ForumStudents = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
 
    const forumService = forumServiceFactory()
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    useEffect(() => {
            forumService.getAll()
            .then((posts) =>{

                setArticles(posts)

            })
       
        setLoading(false)
    }, []);



    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen);
    // };
    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
      
        setIsSidebarOpen(false);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);



    return (
        <>

            <SideBarForum
             articles={articles}
                // toggleSidebar={toggleSidebar} 
                closeSidebar={closeSidebar} 
                isOpen={isSidebarOpen} />

            {isLoading ? <IsLoading /> : (<>
                <section className="forum-page-section">
                    <button className="close-button1" onClick={openSidebar}>Open Sidebar</button>

                    <div className="forum-page">

                        {currentPosts.map((article) => (
                      
                            <OneForumPost key={article._id} {...article}/>
                  
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
                    <button className="close-button2" onClick={openSidebar}>Open Sidebar</button>
                </section>
                <Footer />
            </>)}





        </>

    )
}