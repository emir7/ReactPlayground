import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { MEALS } from "../data/dummy-data";
import FavoritesHeaderButton from "../components/FavoritesHeaderButton";


const MealDetailScreen = (props) => {
    const mealId = props.route.params.mealId;
    
    const selectedMeal = MEALS.find(meal => meal.id == mealId);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <FavoritesHeaderButton />
            ),
            title: selectedMeal.title
        });

    }, [props?.navigation])

    return (
        <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
            <Button title="Go Baack!" onPress={() => {props.navigation.popToTop()}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MealDetailScreen;