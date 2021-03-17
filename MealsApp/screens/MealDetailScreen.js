import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { MEALS } from "../data/dummy-data";
import FavoritesHeaderButton from "../components/FavoritesHeaderButton";
import { ScrollView } from "react-native-gesture-handler";
import DefaultText from "../components/DefaultText";

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>{props.title}
        </View>
    );
};

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
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity}</DefaultText>
                <DefaultText>{selectedMeal.affordability}</DefaultText>
            </View>
            <Text style={styles.title} >Ingredients</Text>
            {selectedMeal.ingredients.map((ingredient) => {
                return <ListItem key={ingredient}>{ingredient}</ListItem>
            })}
            <Text style={styles.title} >Steps</Text>
            {selectedMeal.steps.map((step) => {
                return <ListItem key={step}>{step}</ListItem>
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around"
    },
    title: {
        fontFamily: "open-sans-bold",
        textAlign: "center"
    },
    listItem: {
        marginVertical: 15,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;