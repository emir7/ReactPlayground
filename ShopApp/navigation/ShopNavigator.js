import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";

import DefaultHeaderStyle from "../constants/HeaderStyle";

const ProductsNavigator = createStackNavigator();

const ProductStackNavigator = (props) => {
    return (
        <NavigationContainer>
            <ProductsNavigator.Navigator screenOptions={DefaultHeaderStyle} >
                <ProductsNavigator.Screen name="Products" component={ProductsOverviewScreen} />
                <ProductsNavigator.Screen name="ProductDetail" component={ProductDetailsScreen} />
            </ProductsNavigator.Navigator>
        </NavigationContainer>
    );
};

export default ProductStackNavigator;