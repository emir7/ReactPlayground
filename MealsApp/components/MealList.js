import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import MealItem from "../components/MealItem";

const MealList = (props) => {

    const renderMealItem = (itemData) => {
        return (
            <MealItem
                title={itemData.item.title}
                onSelectMeal={props.selectMealHandler.bind(this, itemData.item.id)}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity.toUpperCase()}
                affordability={itemData.item.affordability.toUpperCase()}
                image={itemData.item.imageUrl}
            />
        );
    };

    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData}  
                keyExtractor={(item, _) => item.id}
                renderItem={renderMealItem}
                style={{width: "100%"}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15
    }
});

export default MealList;