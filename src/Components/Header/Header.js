// Librairie
import React from 'react';
import classes from './Header.module.css';

// Composants
import Navigation from './Navigation/Navigation';
import Img from '../Img/logo.png';

function Header() {
    return (
        <header className={classes.Header}>
            <div className={['container', classes.flex].join(' ')}>
                <div className={classes.logo}>
                    <img src={Img} alt='logo'/>
                </div>
                <nav>
                <Navigation />
                </nav>
            </div>
        </header>
    );
}

export default Header;