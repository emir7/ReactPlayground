import React, {useEffect} from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import {CATEGORIES} from "../data/dummy-data";

const CategoryMealScreen = (props) => {
    const categotyId = props.navigation.getParam("categoryId");

    const selectedCategory = CATEGORIES.find(cat => cat.id == categotyId);
    
    useEffect(() => {
        props.navigation.setParams({"title": selectedCategory.title});
    }, [])

    return (
        <View style={styles.screen}>
            <Text>The Category Meal Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Meal Details Screen" onPress={() => {
                props.navigation.navigate({routeName: "MealDetail"})
            }} />
            <Button title="Go Back" onPress={() => {
                 props.navigation.setParams({ title: 'Updated!' })
            }}/>
        </View>
    );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
    console.log(navigationData);
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CategoryMealScreen;