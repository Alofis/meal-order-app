import { Fragment } from 'react';
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'

const Header = () => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <button>Cart</button>
        </header>
        <div className={classes.main_image}>
            <img src={mealsImage} alt='A table full of food'></img>
        </div>
    </Fragment>
}

export default Header;  