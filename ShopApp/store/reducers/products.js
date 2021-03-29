import PRODUCTS from "../../data/dummy-data";
import { DELETE_USER_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";
import Product from "../../models/product";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId == "u1")
};

const productsReducer = (state = initialState, action) => {
    console.log(action.type);
    switch(action.type) {
        case DELETE_USER_PRODUCT: 
            return {
                availableProducts: state.userProducts.filter(userProduct => userProduct.id != action.productId),
                userProducts: state.userProducts.filter(userProduct => userProduct.id != action.productId)
            };
        case UPDATE_PRODUCT: 
            const prodIndex = state.userProducts.findIndex(product => product.id == action.id);
            const availableProdIndex = state.availableProducts.findIndex(product => product.id == action.id);

            const updatedProduct = new Product(
                action.id, 
                state.userProducts[prodIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[prodIndex].ownerId.price
            );

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[prodIndex] = updatedProduct;

            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProdIndex] = updatedProduct;
        
            return {
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };

        case CREATE_PRODUCT: 
            const newProduct = new Product(
                new Date().toString(),
                "u1",
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct]
            };
    }
    
    return state;
};

export default productsReducer; 