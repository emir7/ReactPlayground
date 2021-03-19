import React, { useEffect } from "react";
import { View, Text, Image, Button, StyleSheet, ScrollView} from "react-native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";

const ProductDetailsScreen = (props) => {

    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id == productId));
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({title: selectedProduct.title});
    }, []);

    const addToCart = (product) => {
        dispatch(cartActions.addToCart(product));
    };

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.buttonContainer}>
                <Button 
                    color={Colors.primary}
                    title="Add to Cart" 
                    onPress={addToCart.bind(this, selectedProduct)} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: "center"
    }
});

export default ProductDetailsScreen;