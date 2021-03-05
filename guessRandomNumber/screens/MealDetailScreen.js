import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";

const MealDetailScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Mean Detail Screen!</Text>
            <Button title="Go Baack!" onPress={() => {props.navigation.popToTop()}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MealDetailScreen;