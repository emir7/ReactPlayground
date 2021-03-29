import React, { useLayoutEffect } from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from "../../components/Shop/OrderItem";

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders);
    
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                        <Item 
                            title="Menu"
                            iconName="md-menu"
                            onPress={() => { props.navigation.toggleDrawer() }}
                        />
                    </HeaderButtons>
                );
            }
        });
    }, []);

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => {
                return (
                    <OrderItem
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        items={itemData.item.items}
                    />
                );
            }}
        />
    );
};

export default OrdersScreen;