import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import DefaultHeaderStyle from "../constants/HeaderStyle";

const ProductsNavigator = createStackNavigator();
const OrdersNavigator = createStackNavigator();
const UserStackNavigator = createStackNavigator();
const ShopNavigationDrawer = createDrawerNavigator();

const ProductStackNavigator = () => {
    return (
        <ProductsNavigator.Navigator screenOptions={DefaultHeaderStyle} >
            <ProductsNavigator.Screen name="Products" component={ProductsOverviewScreen} />
            <ProductsNavigator.Screen name="ProductDetail" component={ProductDetailsScreen} />
            <ProductsNavigator.Screen name="Cart" component={CartScreen} />
        </ProductsNavigator.Navigator>
    );
};

const OrdersStackNavigator = () => {
    return (
        <OrdersNavigator.Navigator screenOptions={DefaultHeaderStyle}>
            <OrdersNavigator.Screen name="Orders" component={OrdersScreen} />
        </OrdersNavigator.Navigator>
    );
};

const UserProductStackNavigator = () => {
    return (
        <UserStackNavigator.Navigator screenOptions={DefaultHeaderStyle}>
            <UserStackNavigator.Screen name="UserProducts" component={UserProductScreen} />
            <UserStackNavigator.Screen name="EditProductScreen" component={EditProductScreen} />
        </UserStackNavigator.Navigator>
    );
};

const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <ShopNavigationDrawer.Navigator screenOptions={DefaultHeaderStyle}>
                <ShopNavigationDrawer.Screen 
                    name="Products" 
                    component={ProductStackNavigator} 
                    options={{
                        drawerIcon: (drawerConfig) => {
                            return (
                                <Ionicons 
                                    name="md-cart"
                                    size={23}
                                    color={drawerConfig.color}
                                />
                            );
                        }
                    }}
                />
                <ShopNavigationDrawer.Screen 
                    name="Orders" 
                    component={OrdersStackNavigator}
                    options={{
                        drawerIcon: (drawerConfig) => {
                            return (
                                <Ionicons 
                                    name="md-list"
                                    size={23}
                                    color={drawerConfig.color}
                                />
                            );
                        }
                    }}
                />
                <ShopNavigationDrawer.Screen 
                    name="UserProducts" 
                    component={UserProductStackNavigator}
                    options={{
                        drawerIcon: (drawerConfig) => {
                            return (
                                <Ionicons 
                                    name="md-create"
                                    size={23}
                                    color={drawerConfig.color}
                                />
                            );
                        },
                        title: "Your Products"
                    }}
                />
            </ShopNavigationDrawer.Navigator>
        </NavigationContainer>
    );
};



export default ShopNavigator;