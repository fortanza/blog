// Librairie
import React from 'react';

//Fontions 

function Article(props) {
    return (
    <>  
    <h1>Ma page article ({props.match.params.id})</h1>
    {props.location.state && props.location.state.fromHome ? <p>Cliqué depuis Acceuil</p> : null}
    </>
    );
}

export default Article;