import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
    totalPrice: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        //const updatedItems = state.items.concat(action.item);
        //const updateTotalAmount = state.totalAmount + action.item * action.item.amount
        //it might be wrong action.item * action.item.amount?
        const updateTotalAmount = state.totalAmount + action.item.amount
        const updateTotalPrice = state.totalPrice + (action.item.amount * action.item.price)
        
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            //check the if an item exists and update the amount
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updateTotalAmount,
            totalPrice: updateTotalPrice
        }
    }
    if(action.type === 'REMOVE') {
        // recieve ID
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalPrice = state.totalPrice - existingItem.price;
        const updatedTotalAmount = state.totalAmount - 1;
        let updatedItems;
        if (existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            totalPrice: updatedTotalPrice
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