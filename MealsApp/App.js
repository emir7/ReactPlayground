import React, {useState} from 'react';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {enableScreens} from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategroyMealsScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

import Colors from "./constants/Colors";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

// optimization
enableScreens();
const Stack = createStackNavigator();
export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  
  if(!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => {setFontLoaded(true)}}
        onError={console.error}/>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: Colors.primaryColor}, headerTintColor: "white"}}>
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
        <Stack.Screen name="MealDetail" component={MealDetailScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
