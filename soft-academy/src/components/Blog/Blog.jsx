import { useEffect, useState } from "react"
import axios from 'axios';
export const Blog = () => {


    

const [news,setNews] = useState([])


const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e8c8f368ce6c4bce9ccf3abede163cd5';
const options = {
	method: 'GET',
	// headers: {
	// 	'content-type': 'application/json',
	// 	'X-RapidAPI-Key': 'efb7caed40msha9a27397b0db6b5p1705ccjsn892646fc2e57',
	// 	'X-RapidAPI-Host': 'customjs.p.rapidapi.com'
	// },
	// body: {
	// 	input: {var1: 10},
	// 	jscode: ' 1 + input.var1'
	// }
};
const newsApi =async()=>{
try {


	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}


}

useEffect(()=>{

    const result = newsApi()
    setNews(result)

},[])

console.log("news",news)
    return (
        <>
            <section id="blog" className="blog" >
                <div className="container">
                    <div className="section-header">
                        <h2>news and articles</h2>
                        <p>Always upto date with our latest News and Articles </p>
                    </div>
                    <div className="blog-content">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="single-blog-item">
                                    <div className="single-blog-item-img">
                                        <img src="./src/assets/images/blog/b1.jpg" alt="blog image" />
                                    </div>
                                    <div className="single-blog-item-txt">
                                        <h2><a href="#">How to find your Desired Place more quickly</a></h2>
                                        <h4>posted <span>by</span> <a href="#">admin</a> march 2018</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur de adipisicing elit, sed do eiusmod tempore incididunt ut labore et dolore magna.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-blog-item">
                                    <div className="single-blog-item-img">
                                        <img src="./src/assets/images/blog/b2.jpg" alt="blog image" />
                                    </div>
                                    <div className="single-blog-item-txt">
                                        <h2><a href="#">How to find your Desired Place more quickly</a></h2>
                                        <h4>posted <span>by</span> <a href="#">admin</a> march 2018</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur de adipisicing elit, sed do eiusmod tempore incididunt ut labore et dolore magna.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="single-blog-item">
                                    <div className="single-blog-item-img">
                                        <img src="./src/assets/images/blog/b3.jpg" alt="blog image" />
                                    </div>
                                    <div className="single-blog-item-txt">
                                        <h2><a href="#">How to find your Desired Place more quickly</a></h2>
                                        <h4>posted <span>by</span> <a href="#">admin</a> march 2018</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur de adipisicing elit, sed do eiusmod tempore incididunt ut labore et dolore magna.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}