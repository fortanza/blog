//Librairie
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios-firebase";
import routes from "../../config/routes";


//composant
import DisplayedArticles from "../../Components/DisplayedArticles/DisplayedArticles";
import classes from './Home.module.css';

function Home() {
  // State
  const [articles, setArticles] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    axios
      .get("/article.json")
      .then((response) => {
        let articlesArray = [];

        for (let key in response.data) {
          articlesArray.push({
            ...response.data[key],
            id: key,
          });
        }

        // Chronologie
        articlesArray.reverse();

        //trier les articles
        articlesArray = articlesArray.filter(
          (article) => article.brouillon == "false"
        );

        //Limiter à trois
        articlesArray = articlesArray.slice(0, 3);

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
      <div className={['container', classes.mainLink].join(' ')}>
        <Link 
        to={routes.ARTICLES}>
          Voir les articles &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default Home;
