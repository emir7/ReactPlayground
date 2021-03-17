import React, {useEffect} from "react";
import {CATEGORIES, MEALS} from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoryMealScreen = (props) => {
    const categotyId = props.route.params.categoryId;

    const selectedCategory = CATEGORIES.find(cat => cat.id == categotyId);
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(categotyId) >= 0);

    useEffect(() => {
        props.navigation.setParams({"title": selectedCategory.title});
    }, []);

    const selectMealHandler = (mealId) => {
        props.navigation.navigate("MealDetail", {
            mealId
        });
    };

    
    return (
      <MealList 
        listData={displayedMeals} 
        selectMealHandler={selectMealHandler}/>
    );
};

export default CategoryMealScreen;