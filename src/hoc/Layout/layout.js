// Librairie
import React from "react";
import classes from './Layout.module.css'

// Composants
import Header from '../../Components/Header/Header'

function Layout(props) {
  return (
    <>
        {/* En-tête*/}
        <Header />
        {props.children}
        {/* Footer */}

    </>
  );
}

/*
    - Composant Header 
        - Logo 
        - Navigation 
            -NavigationItem
*/


export default Layout;
