import React, {useEffect, useState, useCallback} from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";

import * as productsActions from "../../store/actions/products";

const EditProductScreen = (props) => {

    const prodId = props.route.params?.id;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id == prodId));

    const [title, setTitle] = useState((editedProduct == null ) ? "" : editedProduct.title);
    const [imageUrl, setImageUrl] = useState((editedProduct == null ) ? "" : editedProduct.imageUrl);
    const [price, setPrice] = useState((editedProduct == null) ? 0 : editedProduct.price);
    const [description, setDescription] = useState((editedProduct == null ) ? "" : editedProduct.description);
    const dispatch = useDispatch();
    

    const handleCheckmarkClick = useCallback(() => {

        if(editedProduct != null) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, price));
        }
    }, [title, imageUrl, price, description]);


    useEffect(() => {
        props.navigation.setOptions({
            title: (props.route.params?.id ? "Edit product" : "Add product"),
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                        <Item 
                            title="Save"
                            iconName="md-checkmark"
                            onPress={() => { handleCheckmarkClick() }}
                        />
                    </HeaderButtons>
                );
            }
        });
    }, [handleCheckmarkClick]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => {setTitle(text)}}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL </Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}/>
                </View>
                {editedProduct != null ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input} value={price} onChangeText={text => setPrice(parseFloat(text))}/>
                    </View>)
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Descriptions</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: "100%"
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    }

});

export default EditProductScreen;