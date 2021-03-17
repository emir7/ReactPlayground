import React from "react";
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";

import Colors from "../constants/Colors";

const SaveHeaderButton = (props) => (
    <HeaderButton
      {...props}
      onPress={props.onPress}
      disabled={props.disabled}
      IconComponent={Ionicons}
      iconSize={23}
      color={(Platform.OS == "android") ? "white" : Colors.primaryColor}
    />
);

const SaveFilterHeaderWrapper = (props) => {
    return (
        <HeaderButtons HeaderButtonComponent={SaveHeaderButton}>
            <Item 
                title="save" 
                iconName="ios-save" 
                onPress={() => {
                    console.log(props.route.params.save());
                }}  />
        </HeaderButtons>
    );
}

export default SaveFilterHeaderWrapper;