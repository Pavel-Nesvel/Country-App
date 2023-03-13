import axios from "axios";
import React, { useEffect, useState } from "react";
import { Article } from "../components/Article";

import Navigation from "../components/Navigation";
import "../styles/blog.css";

export const Blog = () => {
  const [content, setContent] = useState([]);
  const [blogData, setBlogData]=useState([])
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(false);


  const getDta=()=>{
    axios.get("http://localhost:3004/articles")
    .then((res) => setBlogData(res.data))
  }
  useEffect(() => {
    getDta()
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 140) {
      setError(true);
    } else {
     axios.post("http://localhost:3004/articles",{
      author,
      content,
      date:Date.now()
     });
      setError(false);
      setAuthor("");
      setContent("");
      getDta();

    }
  };
  return (
    <>
      <Navigation />
      <div className="blog_container">
        <h1>Blog</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="author:"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            
          />
          <textarea
            style={{ border: error ? "1px solid red" : "1px solid #61dafb " }}
            placeholder="votre message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {error && <p>ecrivez un minimum de 140 caractere</p>}
          <input type="submit" value="envoyer" />
          
        </form>
            <ul>
                {blogData
                .sort((a,b)=>b.date - a.date)
                .map((article,key)=>(
                   <Article article={article} key={key} />
                ))}
            </ul> 
            

      </div>
    </>
  );
};
