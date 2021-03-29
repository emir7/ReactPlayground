import React, {useLayoutEffect} from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/Shop/ProductItem";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

import { deleteUserProduct } from "../../store/actions/products";

const UserProductScreen = (props) => {
    
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

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
            },
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                        <Item 
                            title="Add"
                            iconName="md-create"
                            onPress={() => { props.navigation.navigate("EditProductScreen") }}
                        />
                    </HeaderButtons>
                );
            },
            title: "Your Products"
        });
    }, []);

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => {
                return (
                    <ProductItem 
                        imageUrl={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            props.navigation.navigate("EditProductScreen", {id: itemData.item.id});
                        }}
                    >
                        <Button 
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                props.navigation.navigate("EditProductScreen", {id: itemData.item.id});
                            }}
                        />
                        <Button 
                            color={Colors.primary}
                            title="Delete"
                            onPress={() => {
                                dispatch(deleteUserProduct(itemData.item.id));
                            }}
                        />
                    </ProductItem>
                );
            }}
        />
    );
};

export default UserProductScreen;