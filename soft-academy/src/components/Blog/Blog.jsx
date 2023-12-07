import { useEffect, useState, lazy, Suspense } from "react"
import { useAuthContext } from "../contexts/UserContext";
import './blogNews.css'
// import  Footer  from "../Footer/Footer";
import { IsLoading } from "../IsLoading/IsLoading";
import { Link } from "react-router-dom";
const Footer = lazy(() => import("../Footer/Footer"))

const Blog = () => {

    const [news, setNews] = useState([])
    const [currentPage, setCurrentPage] = useState(1);//начални 
    const [newsPerPage] = useState(3);
    const [isLoading, setIsLoading] = useState(true)
    const [footer, setFooter] = useState(false) // искам футъра да се зарежда след заявката от апито

    
    useEffect(() => {
        newsApi()

        setIsLoading(false)


    }, [])

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
            setFooter(true)
        } catch (error) {
            console.log(error.message)
        }


    }



    const indexOfLastNews = currentPage * newsPerPage; // връща индекса на последната новина 
    const indexOfFirstNews = indexOfLastNews - newsPerPage; //първата новина на текущата страница
    const currentNews = news?.slice(indexOfFirstNews, indexOfLastNews); //отделям пърите 6 за текущата страница

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <>


            <section id="blog" className="blog">
                <div className="container">
                    <div className="section-header">
                        <h2>News and Articles</h2>
                        <p>Stay up to date with our latest News and Articles</p>
                    </div>
                    {isLoading ? <IsLoading /> : (<>
                        <div className="blog-content">
                            <div className="row"> 
                            
                                {currentNews.map((article, index) => (
                                    <div className="col-md-4 col-sm-6" key={index}>
                                        <div className="single-blog-item">
                                            <div className="single-blog-item-img">
                                                <img style={{height:"220px", width:"400px"}}src={article.thumbnail || "./src/assets/images/blog/b3.jpg"} alt="blog image" />
                                            </div>
                                            <div className="single-blog-item-txt">
                                                <h2><Link to={article.url} target="_blank">{article.title}</Link></h2>
                                                <h4>Posted <span>by</span> <a href="#">{article.author}</a> {new Date(article.published_date).toDateString()}</h4>
                                                <p>{article.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                ))}
                                
           
                            </div>
                        </div>
                        </>)}




                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(news.length / newsPerPage) }, (_, index) => (
                            <li key={index}>
                                {/* извиква номер на страницатa която потребителя иска да види , променям стейта му също currentpage  */}
                                <button onClick={() => paginate(index + 1)}  className={currentPage === index + 1 ? "active" : ""} >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </section>
            {footer && <ul>
                <li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a", float: "right" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
            </ul>}

            {footer && <Footer />}
        </>
    )
}
export default Blog