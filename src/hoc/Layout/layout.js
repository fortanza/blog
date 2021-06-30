// Librairie
import React from "react";
import classes from './Layout.module.css'

// Composants
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

function Layout(props) {
  return (
    <div className={classes.Layout}>
        {/* En-tête*/}
        <Header />

        <div className={classes.content}>
        {props.children}
        </div>
        {/* Footer */}
        <Footer />
        
    </div>
  );
}

/*
    - Composant Header 
        - Logo 
        - Navigation 
            -NavigationItem
*/


export default Layout;
