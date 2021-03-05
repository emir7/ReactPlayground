import React from "react";
import {
    View, 
    StyleSheet,
    Text,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/BodyText";
import Color from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOver = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The game is over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image} 
                        source={require("../assets/success.png")}
                        //fadeDuration
                        //source={{uri: "https://images.squarespace-cdn.com/content/v1/5c60dfaf7d0c91662e150b0d/1568834065228-WTFWD0C9G5S5IUCJ6U7L/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/SUMMIT+EDIT.jpg?format=2500w"}}
                        resizeMode="cover" />
                </View>
                <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.nRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>. </BodyText>
                <View style={styles.newGameButton}>
                    <MainButton onPress={() => {props.onStartNewGame()}} >
                        New Game
                    </MainButton>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: Dimensions.get("window").width*0.3,
        height: Dimensions.get("window").width*0.3,
        borderRadius: Dimensions.get("window").width*0.7 / 2,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 40
    },
    highlight: {
        color: Color.primary
    },
    resultText: {
        textAlign: "center",
        marginHorizontal: 10
    },
    newGameButton: {
        marginTop: 20
    }
});

export default GameOver;