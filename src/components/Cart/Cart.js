import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = (props) => {

    const cartCtx = useContext(CartContext)
   
    const cartTotalPrice = `$${cartCtx.totalPrice.toFixed(2)}`
    const hasItems = cartTotalPrice > 1;

    const cartItemRemoveHandler = (id) => {

    };

    const cartItemAddHandler = (item) => {
        
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => <CartItem 
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={`$${item.toFixed(2)}`}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
        />)}
        </ul>
        )
    

    return <Modal onClose={props.onClose}>
            {cartItems}
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