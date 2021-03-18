import React, {useLayoutEffect} from "react";
import {StyleSheet, View} from "react-native";

import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";
import {useSelector} from "react-redux";
import NavHeaderButton from "../components/NavHeaderButton";

const FavoritesScreen = (props) => {
    const favMeals = useSelector(state => { return state.meals.favoriteMeals});

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

    let CorrectComponent = (
        <MealList 
            listData={favMeals}
            selectMealHandler={selectMealHandler} />);

    if(favMeals.length == 0) {
        CorrectComponent = (
            <View style={styles.content}>
                <DefaultText>No favorite meals added. Start adding some!</DefaultText>
            </View>
        );
    }

    return CorrectComponent;
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default FavoritesScreen;