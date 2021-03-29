import React, { useLayoutEffect } from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from "../../components/Shop/ProductItem";

import CustomHeaderButton from "../../components/UI/HeaderButton";

import * as cartActions from "../../store/actions/cart";

import Colors from "../../constants/Colors";


const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const onCartHeaderListener = () => {
        props.navigation.navigate("Cart");
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                        <Item 
                            title="Cart"
                            iconName="cart" 
                            onPress={onCartHeaderListener}
                        />
                    </HeaderButtons>
                );
            },
            headerLeft: () => {
                return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title="Menu"
                        iconName="md-menu"
                        onPress={() => { props.navigation.toggleDrawer() }}
                    />
                </HeaderButtons>)
            }
        });
    }, []);

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
                onSelect={onViewDetail.bind(this, itemData.item.id)}
            >
                <Button 
                    color={Colors.primary}
                    title="View Details"
                    onPress={onViewDetail.bind(this, itemData.item.id)}
                />
                <Button 
                    color={Colors.primary}
                    title="To Cart"
                    onPress={onAddToCart.bind(this, itemData.item)}
                />
            </ProductItem>
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