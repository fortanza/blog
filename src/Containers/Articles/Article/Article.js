// Librairie
import React, { useState, useEffect } from "react";
import axios from "../../../config/axios-firebase";
import classes from "./Article.module.css";
import routes from "../../../config/routes";

//Fontions

function Article(props) {
  //State
  const [article, setArticle] = useState({});

  //componentDidMont
  useEffect(() => {
    axios
      .get(
        '/article.json?orderBy="slug"&equalTo="' + props.match.params.slug + '"'
      )
      .then((response) => {
        for (let key in response.data) {
          setArticle({ ...response.data[key], id: key });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  //fonction

  const deleteclickHandler = () => {
    axios
      .delete("/article/" + article.id + ".json")
      .then((response) => {
        props.history.push(routes.HOME);
      })
      .catch((error) => console.log(error));
  };

  //variable
  let date = new Date(article.date).toLocaleDateString("fr-FR");

  return (
    <div className="container">
      <h1>{article.titre}</h1>

      <div className={classes.content}>
        <div className={classes.lead}>{article.accroche}</div>
        {article.contenu}
      </div>

      <div className={classes.button}>
        <button onClick={deleteclickHandler}>Supprimer</button>
      </div>

      <div className={classes.author}>
        <b>{article.auteur}</b>
        <span>Publié le {date}</span>
      </div>
    </div>
  );
}

export default Article;
