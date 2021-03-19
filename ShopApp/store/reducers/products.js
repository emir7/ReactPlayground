import PRODUCTS from "../../data/dummy-data";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.id == "u1")
};

const productsReducer = (state = initialState, action) => {
    return state;
};

export default productsReducer; 