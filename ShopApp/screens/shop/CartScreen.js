import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";

import CartItem from "../../components/Shop/CartItem";

import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/order";

const CartScreen = (props) => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const arr = [];
        for (const key in state.cart.items) {
            arr.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        
        return arr.sort((a, b) => a.productId.localeCompare(b.productId));
    });

    const dispatch = useDispatch();

    const removeSpacificItem = (productId) => {
        dispatch(cartActions.removeFromCart(productId))
    };

    const renderCartItem = (itemData) => {
        return (
            <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum.toFixed(2)}
                onRemove={() => { 
                    removeSpacificItem(itemData.item.productId) 
                }}
                deletable
            />
        );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text></Text>
                <Button 
                    title="Order Now" 
                    color={Colors.accent} 
                    disabled={cartItems.length == 0} 
                    onPress={() => dispatch(ordersActions.addOrder(cartItems, cartTotalAmount)) }/>
            </View>
            <View>
                <Text>Cart items</Text>
            </View>
            <FlatList 
                style={{marginTop: 20}}
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={renderCartItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        overflow: "hidden"
    },
    summaryText: {
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;