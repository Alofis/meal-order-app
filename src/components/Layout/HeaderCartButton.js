import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext } from 'react';
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    console.log(cartCtx)
    console.log(props)

    const numberOfCartItems = cartCtx.items.reduce((currentValue, item) => {
        return currentValue + item.amount
    }, 0)

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;