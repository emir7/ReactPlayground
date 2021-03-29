import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

import Colors from "../../constants/Colors";

import CartItem from "./CartItem"

const OrderItem = (props) => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem} >
            <View style={styles.summary} >
                <Text style={styles.totalAmount} >{props.amount.toFixed(2)}</Text>
                <Text style={styles.date} >{props.date}</Text>
            </View>
            <Button
                title={(showDetails) ? "Hide details ": "Show details"}
                color={Colors.primary}
                onPress={() => {
                    setShowDetails(!showDetails);
                }}
            />
            {showDetails && <View>
                    {props.items.map((cartItem) => {
                        return (
                            <CartItem
                                key={cartItem.productId}
                                quantity={cartItem.quantity}
                                amount={cartItem.sum}
                                title={cartItem.productTitle}
                            />
                        );
                    })}
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        padding: 10,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        overflow: "hidden"
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    totalAmount: {
        fontSize: 16
    },
    date: {
        fontSize: 16,
        color: "#888"
    }
});

export default OrderItem;