import React, {useLayoutEffect} from "react";

import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import NavHeaderButton from "../components/NavHeaderButton";

const FavoritesScreen = (props) => {

    const favMeals = MEALS.filter(meal => meal.id == "m1" || meal.id == "m2");
    
    const selectMealHandler = (mealId) => {
        props.navigation.navigate("MealDetail", {
            mealId
        });
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <NavHeaderButton 
                    navigation={props.navigation} />
            )
        });

    }, [props?.navigation])

    return (
        <MealList 
            listData={favMeals}
            selectMealHandler={selectMealHandler} />
    );
};

export default FavoritesScreen;