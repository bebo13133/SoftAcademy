import React, { useState, useEffect,lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import'../Hooks/paginations.css'

import './forumStudents.css'
import { SideBarForum } from './SideBarForum/SideBarForum';
import OneForumPost  from './OneForumPost';
import { forumServiceFactory } from "../Services/forumService";

import Footer from '../Footer/Footer';
import { IsLoading } from '../IsLoading/IsLoading';
import { usePaginations } from '../Hooks/usePaginations';

export const ForumStudents = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
 
    const forumService = forumServiceFactory()
  
    const postsPerPage = 3;

    useEffect(() => {
            forumService.getAll()
            .then((posts) =>{

                setArticles(posts)

            })
            .catch(error => {
                console.log(error.message || error)
            })
            const timeoutId = setTimeout(() => {
                setIsSidebarOpen(true);
              }, 1160); // Променете времето според вашите предпочитания
              setLoading(false)


              return () => clearTimeout(timeoutId);
      
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

    const {getPaginationData}=usePaginations(postsPerPage)
    const {currentPage,totalPages,paginate,currentResult } = getPaginationData(articles)



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

                        {currentResult && currentResult.map((article) => (
                      
                            <OneForumPost key={article._id} {...article}/>
                  
                        ))}
                    </div>
                    <ul className="pagination-admin">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                    <button className="close-button2" onClick={openSidebar}>Open Sidebar</button>
                    <Footer/>
                </section>
                <section>

               
                                
                </section>
            </>)}





        </>

    )
}