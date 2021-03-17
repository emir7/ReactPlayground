import React from "react";
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";

import Colors from "../constants/Colors";

const NavHeaderButton = (props) => (
    <HeaderButton
      {...props}
      onPress={props.onPress}
      disabled={props.disabled}
      IconComponent={Ionicons}
      iconSize={23}
      color={(Platform.OS == "android") ? "white" : Colors.primaryColor}
    />
);

const NavHeaderButtonWrapper = (props) => {
    return (
        <HeaderButtons HeaderButtonComponent={NavHeaderButton}>
            <Item 
                title="Menu" 
                iconName="ios-menu" 
                onPress={() => props.navigation.toggleDrawer()}  />
        </HeaderButtons>
    );
}

export default NavHeaderButtonWrapper;