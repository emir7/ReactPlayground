import React, {useEffect} from "react";
import {CATEGORIES} from "../data/dummy-data";
import {useSelector} from "react-redux";
import MealList from "../components/MealList";
import {View, StyleSheet} from "react-native";
import DefaultText from "../components/DefaultText";

const CategoryMealScreen = (props) => {
    const categoryId = props.route.params.categoryId;

    const filterMeals = (state) => {
        const correctMeals = [];
        for(const meal of state.meals.filteredMeals) {
            if(meal.categoryIds.indexOf(categoryId) >= 0) {
                correctMeals.push({...meal})
            }
        }
        return correctMeals;
    };

    const selectedCategory = CATEGORIES.find(cat => cat.id == categoryId);
    const availableMeals = useSelector(filterMeals);

    useEffect(() => {
        props.navigation.setParams({"title": selectedCategory.title});
    }, []);

    const selectMealHandler = (mealId) => {
        props.navigation.navigate("MealDetail", {
            mealId
        });
    };

    let Content = null;

    if(availableMeals.length > 0) {
        Content = (
        <MealList 
            listData={availableMeals} 
            selectMealHandler={selectMealHandler}/>
        );
    }else {
        Content = (
            <View style={styles.content}>
                <DefaultText>No meals found. Check your Filters.</DefaultText>
            </View>
        );
    }

    return Content;
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CategoryMealScreen;