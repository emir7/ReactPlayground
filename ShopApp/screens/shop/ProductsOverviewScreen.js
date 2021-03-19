import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/Shop/ProductItem";

import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const onViewDetail = (productId) => {
        props.navigation.navigate("ProductDetail", {
            productId
        });
    };

    const onAddToCart = (product) => {
        dispatch(cartActions.addToCart(product));
    };


    const renderItem = (itemData) => {
        return (
            <ProductItem 
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={onViewDetail.bind(this, itemData.item.id)}
                onAddToCart={onAddToCart.bind(this, itemData.item)}
            />
        );
    }

    return (
        <FlatList 
            data={products}
            keyExtractor={(item, _) => item.id} 
            renderItem={renderItem}/>
    );

};

export default ProductsOverviewScreen;