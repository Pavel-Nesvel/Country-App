import React, { useState } from "react";
import axios from "axios";
import "../styles/article.css";

export const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const dateFormat = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updateDate: Date.now(),
    };
    axios.put("http://localhost:3004/articles/" + article.id, data);
    setIsEditing(false);
  };
  const handleDelet = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);
  };
  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="article_header">
        <h3>{article.author}</h3>
        <em>Posté le {dateFormat(article.date)}</em>
      </div>

      {isEditing ? (
        <textarea
          autoFocus
          defaultValue={editContent ? editContent : article.content}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}

      <div className="btn_container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button
          onClick={(e) => {
            if (window.confirm("voulez vous vraiment suprimer cette article")) {
              handleDelet();
              window.location.reload();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};
