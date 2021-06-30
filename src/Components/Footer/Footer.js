// Librairie
import react from "react";

//Composants
import classes from './Footer.module.css'


function Footer (props) {
    return (
        <footer className={classes.Footer}>
            <div className='container'>
                2021 © Blog - Fortanza
            </div>
        </footer>
    )
}

export default Footer;