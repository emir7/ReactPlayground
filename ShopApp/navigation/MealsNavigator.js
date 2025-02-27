import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategroyMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import { Platform } from "react-native";
import { Item } from "react-navigation-header-buttons";

import CustomHeaderButtons from "../components/CustomHeaderButtons";
import Colors from "../constants/Colors";

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: {
        screen: MealDetailScreen,
        navigationOptions: () => {
           return {
               headerRight: (
                <CustomHeaderButtons>
                    <Item 
                        title ="Favorite"
                        iconName="ion-star"
                        onPress={() => {console.log("haha"); }}
                    />
                </CustomHeaderButtons>
               )
            }
        }
     
    }
}, {
    defaultNavigationOptions: ({navigation}) => {
        return {
            title: navigation.getParam("title"),
            headerStyle: {
                backgroundColor: (Platform.OS == "android") ? Colors.primaryColor : ""
            },
            headerTintColor: (Platform.OS == "android") ? "white": Colors.primaryColor
        }
    }
});

export default createAppContainer(MealsNavigator);