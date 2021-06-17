//Librairies
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';

// import { Redirect } from 'react-router-dom'

function Articles(props) {

    // useEffect (() => {
    //     props.history.push("/")

    //     /*
    //         -push : ajouter une page dans l'historique ('/')
    //             -/
    //             - /article
    //             -/ car redirection
    //         -replace: remplace une page actuel dans l'historique ('/')
    //             -/
    //             -/ car remplacer
               
    //     */
    // }, []);

    return (
    <>    
    <h1>Articles</h1>
    {/* <Redirect to="/" /> */}
    <Link to={routes.CONTACT}>Contactez moi</Link>
    </>
    );
}

export default Articles;