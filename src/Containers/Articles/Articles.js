//Librairies
import React,{useState, useEffect} from 'react';
import axios from '../../config/axios-firebase';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

// composant 
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Articles(props) {

    // State
    const [articles, setArticles] = useState ([]);

    // ComponentDidMount
    useEffect(() => {
       axios.get('/article.json')
       .then(response => {
           let  articlesArray = [];

           for (let key in response.data) {
            articlesArray.push({
                ...response.data[key],
                id: key
            })
           }

           //chronologie
           articlesArray.reverse();

           //trier les artiles
           articlesArray = articlesArray.filter(article => article.brouillon == 'false');

           setArticles(articlesArray);
        })
       .catch(error => {console.log(error);})
    }, [])
    //DisplayedArticles
        /*  <section> ... </section>
            Contient 
            DisplayedArticle 
        
        */
    return (
    <>    
    <h1>Articles</h1>
    <DisplayedArticles articles={articles} />
    <Link to={routes.CONTACT}>Contactez moi</Link>
    </>
    );
}

export default Articles;