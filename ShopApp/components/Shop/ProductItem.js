import React from "react";
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from "react-native";

const ProductItem = (props) => {
    return (
        <View style={styles.product}>
            <TouchableNativeFeedback onPress={props.onSelect} useForeground  >
                <View>
                    <Image
                        style={styles.image}
                        source={{uri: props.imageUrl}} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${0}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                      {props.children}
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        flex: 1,
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
        height: 300,
        margin: 20,
        overflow: "hidden"
    },
    details: {
        alignItems: "center",
        height: "15%",
        padding: 10
    },
    image: {
        width: "100%",
        height: "60%"
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: "#888"
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "25%"
    }
});

export default ProductItem;