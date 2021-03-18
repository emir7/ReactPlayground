import React from "react";
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";

import Colors from "../constants/Colors";

const FavoritesHeaderButton = (props) => (
    <HeaderButton
      {...props}
      onPress={props.onPress}
      disabled={props.disabled}
      IconComponent={Ionicons}
      iconSize={23}
      color={(Platform.OS == "android") ? "white" : Colors.primaryColor}
    />
);

const FavoritesHeaderButtonWrapper = (props) => {
    return (
        <HeaderButtons HeaderButtonComponent={FavoritesHeaderButton}>
            <Item title="search" iconName={props.isFavoriteMeal ? "ios-star" : "ios-star-outline"} onPress={() => props.onPress()}  />
        </HeaderButtons>
    );
}

export default FavoritesHeaderButtonWrapper;