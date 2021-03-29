import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_USER_PRODUCT } from "../actions/products";

import CartItem from "../../models/CartItem";

const initialState = {
    items: {},
    totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:  
            const {price, title, id} = action.product; 

            if(state.items[id] != null) {
                const updatedCartItem = new CartItem(
                    state.items[id].quantity + 1,
                    price,
                    title,
                    state.items[id].sum + price
                );
                
                return {
                    //...state,
                    items: {
                        ...state.items,
                        [id]: updatedCartItem
                    },
                    totalAmount: state.totalAmount + price
                };

            } else {
                const newCartItem = new CartItem(1, price, title, price);
                return {
                    //...state,
                    items: {
                        ...state.items,
                        [id]: newCartItem
                    },
                    totalAmount: state.totalAmount + price
                }
            }
        case REMOVE_FROM_CART:
            const productId = action.productId;
            const product = state.items[productId];

            if(product.quantity == 1) {
                delete state.items[productId];
                return {
                    items: { ...state.items },
                    totalAmount: state.totalAmount - product.sum }
            } else {
                return {
                    items: {
                        ...state.items,
                        [productId]: {
                            ...product,
                            quantity: --product.quantity,
                            sum: product.sum - product.productPrice
                        }
                    },
                    totalAmount: state.totalAmount - product.productPrice 
                }
            }

        case ADD_ORDER:
            return initialState;

        case DELETE_USER_PRODUCT: 
            if(state.items[action.productId] == null) {
                return state;
            }
            
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.productId].sum;
            delete updatedItems[action.productId];

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
        }

    return state
};

export default cartReducer;