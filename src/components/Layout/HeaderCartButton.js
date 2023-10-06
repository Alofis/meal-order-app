import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnHighLigthed] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx
    const numberOfCartItems = items.reduce((currentValue, item) => {
        return currentValue + item.amount
    }, 0)
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0){
            return;
        }
        setBtnHighLigthed(true);

        const timer = setTimeout(() => {
            setBtnHighLigthed(false)
        },300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])


    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;