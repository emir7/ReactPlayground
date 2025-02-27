import React from "react";
import {
    Text,
    StyleSheet
} from "react-native";


const BodyText = props => {
    return <Text style={{ ...props.style ,...styles.body}} >{props.children}</Text>
};

const styles = StyleSheet.create({
    body: {
        fontFamily: "open-sans-bold"
    }
});

export default BodyText;