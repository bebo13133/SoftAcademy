import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/UserContext";
import './blogNews.css'
export const Blog = () => {

    const [news, setNews] = useState([])
    const [currentPage, setCurrentPage] = useState(1);//начални 
    const [newsPerPage] = useState(6);


   useEffect(() => {

     newsApi()
     

    },[])

//заявка към api с NEws + ApiKey за authentication
    const url = 'https://news-api14.p.rapidapi.com/top-headlines?country=us&language=en&pageSize=10&category=sports&sortBy=title';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'efb7caed40msha9a27397b0db6b5p1705ccjsn892646fc2e57',
            'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
        }
    };



    const newsApi = async () => {

        try {


            const response = await fetch(url, options);
           
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setNews(data.articles);
            // console.log(data)
            // console.log(news)

        } catch (error) {
            throw new Error(error.message)
        }


    }

 

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage; 
    const currentNews = news?.slice(indexOfFirstNews, indexOfLastNews); //отделям пърите 6 от всичките

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
    return (
        <>
        <section id="blog" className="blog">
                <div className="container">
                    <div className="section-header">
                        <h2>News and Articles</h2>
                        <p>Stay up to date with our latest News and Articles</p>
                    </div>
                    <div className="blog-content">
                        <div className="row">
                            {currentNews.map((article, index) => (
                                <div className="col-md-4 col-sm-6" key={index}>
                                    <div className="single-blog-item">
                                        <div className="single-blog-item-img">
                                            <img src={article.thumbnail || "./src/assets/images/blog/b3.jpg"} alt="blog image" />
                                        </div>
                                        <div className="single-blog-item-txt">
                                            <h2><a href={article.url}>{article.title}</a></h2>
                                            <h4>Posted <span>by</span> <a href="#">{article.author}</a> {new Date(article.published_date).toDateString()}</h4>
                                             <p>{article.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(news.length / newsPerPage) }, (_, index) => (
                            <li key={index}>
                                <button onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}