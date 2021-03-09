import React from "react";
import {TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback} from "react-native";

const CategoryGridTile = (props) => {

    let TouchableCmp = TouchableOpacity;

    if(Platform.OS == "android" && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }

    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={styles.gridItem} 
                onPress={props.onPressHandler.bind(this, props.data.item.id)}>
                <View style={{backgroundColor: props.data.item.color, ...styles.container}}>
                    <Text  style={styles.title} >{props.data.item.title}</Text>
                </View>
            </TouchableCmp>
        </View>

    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: "hidden"
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.6, // shadow works for iOS only.. elevation => android
        shadowOffset: {width: 0, height: 2},
        elevation: 3,
        padding: 15, 
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    title: {
        fontSize: 22,
        fontFamily: "open-sans-bold",
        textAlign: "right"
    }
});

export default CategoryGridTile;