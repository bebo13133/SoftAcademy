import React, { useState, useEffect } from 'react';


export const ForumStudents=()=>{

    const [articles, setArticles] = useState([]);
    useEffect(() => {
        // Тук може да направите fetch към сървъра си за зареждане на статиите
        // Пример: fetchArticles().then(data => setArticles(data));
      }, []);

    return(
<>
<div className="forum-page">
      <h1>Forum - All Articles</h1>
      {articles.map((article) => (
        <div key="{article.id}" className="article">
          <img src="{article.imageUrl}" alt={article.title} />
          <div className="article-details">
            <h2>"{article.title}"</h2>
            <p>"{article.description}"</p>
            <p>
              <strong>Author:</strong> {article.author}
            </p>
            <p>
              <strong>Created at:</strong> {new Date(article.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>

</>

    )
}