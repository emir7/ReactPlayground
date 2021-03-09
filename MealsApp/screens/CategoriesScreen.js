import React from "react";
import {View, Text, FlatList, StyleSheet, Button, TouchableOpacity} from "react-native";

import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {

    
    const onPressHandler = (catId) => {
       props.navigation.navigate("CategoryMeals", {
            categoryId: catId
        });
    }

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile data={itemData} onPressHandler={onPressHandler} />
        );
    };



    return (
        <FlatList 
            keyExtractor={(item, _) => item.id} 
            data={CATEGORIES} 
            renderItem={renderGridItem} 
            numColumns={2} />
    );
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CategoriesScreen;