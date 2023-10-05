import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import { Fragment, useContext } from 'react'
import CartContext from '../../store/cart-context'

const Cart = (props) => {
    // const cartItems = <ul className={classes['cart-items']}>{
    //     [{
    //    id: 'c1',
    //    name: 'Sushi',
    //     amount: 2,
    //      price: 12.99
    //  }].map((item) => <li>{item.name}</li>)
    //  }</ul> 

    const cartCtx = useContext(CartContext)
    console.log(cartCtx)
    const cartTotalPrice = `$${cartCtx.totalPrice.toFixed(2)}`
    const hasItems = cartTotalPrice > 1;

    return <Modal onClose={props.onClose}>
            {cartCtx.items.map((item, index) => <Fragment key={index}>
                <ul  className={classes['cart-items']}>
                    <li>Name: {item.name}</li>
                    <li>Amount: {item.amount}</li>
                    <li>Price: {item.price}</li>
                </ul>
            </Fragment>)}

            <div className={classes.total}>
            <span>Total amount:</span>
            <span>{cartTotalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
    </Modal>
}

export default Cart;