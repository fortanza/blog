import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Acceuil</h1>
      <Link to="/articles/1">Voir mon article</Link>
      <Link 
          to={{
              pathname: "/articles/1",
              // hash: '#projet' pour une ancre
              // search: "?order=new"
              state : { fromHome: true}
          }} 
          style={{marginLeft: '15px'}}>
            Lien vers une ancre
      </Link>
     
    </>
  );
}

export default Home;
