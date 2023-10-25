import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import useHttp from '../../http-hook/use-http'

const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const { isLoading, hasError: httpError, sendRequest: postNewOrder} = useHttp();
    const [ orderConfirmation, setOrderConfirmation ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ didSubmit, setDidSubmit ] = useState(false);
    const [ showData, setShowData ] = useState(null);
   
    const cartTotalPrice = `$${cartCtx.totalPrice.toFixed(2)}`
    const hasItems = cartCtx.totalPrice > 1;
    // its false with the $

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount: 1})
    }

    const confirmOrder = () => {
        setOrderConfirmation(true);
    }

    const cancelConfirmation = () => {
        console.log('cancel form clicked')
        setOrderConfirmation(false);
    }

   /* const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        console.log(userData)
        try {
            const response = await fetch("https://http-requests-14d51-default-rtdb.europe-west1.firebasedatabase.app/order.json", {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });

        if (!response.ok) {
            throw new Error('Request failed.')
        }

        } catch (err) {
            setHasError(err.message || "Something went wrong")
            return
        }
        setIsSubmitting(false);
        setDidSubmit(true);
    } */

    const showResponse = (dataObj) => {
        setShowData(dataObj.name);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        postNewOrder({
            url: "https://http-requests-14d51-default-rtdb.europe-west1.firebasedatabase.app/order.json",
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
              },
            body: {
                user: userData,
                orderItems: cartCtx.items
            }
        }, showResponse)
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCartItems();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => <CartItem 
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
        />)}
        </ul>
        )

    const modalActions = (
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={confirmOrder}>Order</button>}
        </div>
    )

    const cartModule = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
            <span>Total amount:</span>
            <span>{cartTotalPrice}</span>
            </div>
            {orderConfirmation && <Checkout onConfirm={submitOrderHandler} onCancel={cancelConfirmation} />}
            {!orderConfirmation && modalActions}
        </React.Fragment>
    )
    
    const isSubmittingModalContent = (
        <p>...Sending order data...</p>
    )

    const didSubmitModalContent = (
        <React.Fragment>
        <p>Successfully sent the order....</p>
        {showData && <p>Firebase number: {showData}</p>}
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
        </React.Fragment>
    )

    console.log(showData);

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModule}
        {isLoading && isSubmittingModalContent}
        {didSubmit && didSubmitModalContent}
        {httpError && <p>{httpError}</p>}
    </Modal>
}

export default Cart;