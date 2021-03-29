export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteUserProduct = (productId) => {
    return {
        type: DELETE_USER_PRODUCT,
        productId
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return {
        type: CREATE_PRODUCT,
        productData: {
            title,
            description,
            imageUrl,
            price
        }
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        id,
        productData: {
            title,
            description,
            imageUrl
        }
    };
};