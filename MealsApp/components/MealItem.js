import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from "react-native";

import DefaultText from "../components/DefaultText";

const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <DefaultText style={styles.title} numberOfLines={1} >{props.title}</DefaultText>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <DefaultText>{props.duration}m</DefaultText>
                        <DefaultText>{props.complexity}</DefaultText>
                        <DefaultText>{props.affordability}</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
       

};

const styles = StyleSheet.create({
    mealRow: {
        flexDirection: "row"
    },
    mealItem: {
        height: 200,
        width: "100%"
    },
    mealHeader: {
        height: "85%"
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
        height: "15%"
    },
    bgImage: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        color: "white",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: "center"
    }
});

export default MealItem;