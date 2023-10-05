import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
    totalPrice: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedItems = state.items.concat(action.item);
        //const updateTotalAmount = state.totalAmount + action.item * action.item.amount
        //it might be wrong action.item * action.item.amount?
        const updateTotalAmount = state.totalAmount + action.item.amount
        const updateTotalPrice = state.totalPrice + (action.item.amount * action.item.price)

        return {
            items: updatedItems,
            totalAmount: updateTotalAmount,
            totalPrice: updateTotalPrice
        }
    }
    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)


    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    };

    const removeItemFromCartHandler =  (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    };

    const cartContext = {
        items: cartState.items,
        amount: cartState.totalAmount,
        totalPrice: cartState.totalPrice,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;