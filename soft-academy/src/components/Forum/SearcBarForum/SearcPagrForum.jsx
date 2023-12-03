import React, { useState, useEffect,lazy, Suspense } from 'react';

import'../../Hooks/paginations.css'

import '../forumStudents.css'
import { SideBarForum } from '../SideBarForum/SideBarForum';
import OneForumPost  from '../OneForumPost';
// import { forumServiceFactory } from "../../Services/forumService";

import Footer from '../../Footer/Footer';
import { IsLoading } from '../../IsLoading/IsLoading';

import { Pagination } from '../../Pagination/Pagination';
import { SearchBarForum } from '../SearcBarForum/SeacrhBarForum';
import { useForumContext } from '../../contexts/ForumContext';
import { usePaginations } from '../../Hooks/usePaginations';
import { useAuthContext } from '../../contexts/UserContext';
import { forumServiceFactory } from '../../Services/forumService';





export const SearchPageForum =()=>{
    const {forumSearchPage}=useForumContext()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sideBarArticles, setSideBarArticles] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
 
    const { token } = useAuthContext()
    const forumService = forumServiceFactory(token)
  
    const postsPerPage = 3;
  
    useEffect(() => {

        forumService.getAll()
        .then((posts) =>{
            const sortedResult = posts.sort((a, b) => b._createdOn- a._createdOn);
            setSideBarArticles(sortedResult)
         

        })
        .catch(error => {
            console.log(error.message || error)
        })

        setArticles(forumSearchPage)
            const timeoutId = setTimeout(() => {
               
                setIsSidebarOpen(true);
                setLoading(false)
              }, 50); // Променете времето според вашите предпочитания
             
         
           
              return () => clearTimeout(timeoutId);
      
    }, [forumSearchPage]);



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
    const {currentPage,totalPages,paginate,currentResult,setCurrentPage } = getPaginationData(articles)

   

   

    return (
        <>

            <SideBarForum
             sideBarArticles={sideBarArticles}
             articles={articles}
                closeSidebar={closeSidebar} 
                isOpen={isSidebarOpen} />

            {isLoading ? <IsLoading /> : (<>
  
                <section className="forum-page-section">
                <SearchBarForum/>
                (<h2 className="no-articles" style={{marginBottom: "-56px",color: "rgb(189, 104, 19)",textShadow: "0 4px 8px rgb(6 85 255 / 36%)"}}>Find results: {sideBarArticles.length}</h2>)
                    <button className="close-button1" onClick={openSidebar}>Open Sidebar</button>

                    <div className="forum-page">

                        {currentResult.length > 0 ? currentResult.map((article) => (
                      
                            <OneForumPost key={article._id} {...article}/>
                  
                        )):(<h2 className="no-articles">No forums yet</h2>)}
                    </div>
                    <Pagination paginate={paginate} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                    <button className="close-button2" onClick={openSidebar}>Open Sidebar</button>
                    <Footer/>
                </section>
                <section>

               
                                
                </section>
            </>)}





        </>

    )
}