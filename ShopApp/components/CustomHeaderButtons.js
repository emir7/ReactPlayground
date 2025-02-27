import React from "react";
import { HeaderButton, HeaderButtons } from "react-navigation-header-buttons";
import { Ionicons} from "@expo/vector-icons";
import { Platform } from "react-native";

import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS == "android" ? "white" : Colors.primaryColor}
            {...props}
            title="jaja"
        />)
};

const CutomHeaderButtons = (props) => {
    return <HeaderButtons HeaderButtonComponent={CustomHeaderButton} {...props}></HeaderButtons>;
};

export default CutomHeaderButtons;