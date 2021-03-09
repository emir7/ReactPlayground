import React, {useEffect} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";

import {CATEGORIES, MEALS} from "../data/dummy-data";
import MealItem from "../components/MealItem";

const CategoryMealScreen = (props) => {
    console.log(props.route);
    const categotyId = props.route.params.categoryId;

    const selectedCategory = CATEGORIES.find(cat => cat.id == categotyId);
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(categotyId) >= 0);

    useEffect(() => {
        props.navigation.setParams({"title": selectedCategory.title});
    }, []);


    const selectMealHandler = (mealId) => {
        console.log("mealId = "+mealId);
        props.navigation.navigate("MealDetail", {
            mealId
        });
        /*props.navigation.navigate({routeName: "MealDetail", params: {
            mealId
        }});*/
    };

    const renderMealItem = (itemData) => {
        return (
            <MealItem
                title={itemData.item.title}
                onSelectMeal={selectMealHandler.bind(this, itemData.item.id)}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity.toUpperCase()}
                affordability={itemData.item.affordability.toUpperCase()}
                image={itemData.item.imageUrl}
            />
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList 
                data={displayedMeals}  
                keyExtractor={(item, _) => item.id}
                renderItem={renderMealItem}
                style={{width: "100%"}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15
    }
});

export default CategoryMealScreen;