import React, {useState} from 'react';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {enableScreens} from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Platform, Text } from "react-native"; 
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategroyMealsScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FiltersScreen from "./screens/FiltersScreen";

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
const Tab =  (Platform.OS == "android") ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const FavStack = createStackNavigator();
const FiltersStack = createStackNavigator();
const Drawer = createDrawerNavigator()

// STACK NAVIGATORS
// Favorites Stack
const StackFav = () => {
  return (
    <FavStack.Navigator screenOptions={{headerStyle: {backgroundColor: Colors.primaryColor}, headerTintColor: "white", headerTitleStyle: {fontFamily: "open-sans"}}}>
      <FavStack.Screen name="Your Favorites" component={FavoritesScreen}/>
      <FavStack.Screen name="MealDetail" component={MealDetailScreen}  />
    </FavStack.Navigator>
    );
};

// Categories Stack
const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: Colors.primaryColor}, headerTintColor: "white", headerTitleStyle: {fontFamily: "open-sans"}}}>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen}  />
    </Stack.Navigator>
    );
};

// Filters Stack 
const FiltersNav = () => {
  return (
    <FiltersStack.Navigator screenOptions={{headerStyle: {backgroundColor: Colors.primaryColor}, headerTintColor: "white", headerTitleStyle: {fontFamily: "open-sans"}}}>
      <Stack.Screen name="Filter Meals" component={FiltersScreen} />
    </FiltersStack.Navigator>
  );
};

// Bottom TAB navigator
const TabNav = () => {
  return (
    <Tab.Navigator 
      shifting={true}
      tabBarOptions={{activeTintColor: Colors.accentColor}}
    >
      <Tab.Screen 
        name="Categories" 
        component={StackNav} 
        options={{ 
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-restaurant" size={25} color={(tabInfo.focused) ? Colors.accentColor : tabInfo.tintColor}/>
          },
          tabBarColor: Colors.primaryColor,
          tabBarLabel: <Text style={{fontFamily: "open-sans-bold"}}>Meals</Text>,

          }} />
      <Tab.Screen 
        name="Favorites" 
        component={StackFav}  
        options={{ 
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-star" size={25} color={(tabInfo.focused) ? "white" : tabInfo.tintColor}/>
          },
          tabBarLabel: <Text style={{fontFamily: "open-sans-bold"}}>Favorites</Text>,
          tabBarColor: Colors.accentColor
          }} />
    </Tab.Navigator>
  );
};

// Main navigation Drawer
const MainNavigator = () => {
  return (
      <Drawer.Navigator drawerContentOptions={{activeTintColor: Colors.accentColor, labelStyle: {fontFamily: "open-sans"}}}  >
        <Drawer.Screen name="Favorites" component={TabNav}/>
        <Drawer.Screen name="Filters" component={FiltersNav} />
      </Drawer.Navigator>
  );
};


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
      <MainNavigator/>
    </NavigationContainer>
  );
}
