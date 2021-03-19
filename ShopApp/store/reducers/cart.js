import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/CartItem";

const initialState = {
    items: {},
    totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:  
            const {price, title, id} = action.product; 

            if(items[id] != null) {
                const updatedCartItem = new CartItem(
                    state.items[id].quanity + 1,
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
        }
    return state
};

export default cartReducer;