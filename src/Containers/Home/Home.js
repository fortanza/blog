//Librairie
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios-firebase";
import routes from '../../config/routes';

//composant
import DisplayedArticles from "../../Components/DisplayedArticles/DisplayedArticles";

function Home() {
  // State
  const [articles, setArticles] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    axios
      .get('/article.json?orderBy="date"&limitToLast=3')
      .then((response) => {
        const articlesArray = [];

        for (let key in response.data) {
          articlesArray.push({
            ...response.data[key],
            id: key,
          });
        }

        articlesArray.reverse(); 

        setArticles(articlesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Acceuil</h1>
      <DisplayedArticles articles={articles} />
      <Link to={routes.ARTICLES}>Voir les articles</Link>
    </>
  );
}

export default Home;
