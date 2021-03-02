import React, {useState, useRef, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    Dimensions
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumb = Math.floor(Math.random() * (max - min)) + min;

    if(rndNumb == exclude) {
        return generateRandomNumber(min, max, exclude);
    }else {
        return rndNumb;
    }
};

const GameScreen = (props) => {

    const initialGuess = generateRandomNumber(1, 100, props.userChoice).toString();
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState(0);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        const updateLayout = () => {
            setScreenHeight(Dimensions.get("window").height);
        };
    
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        }
    });

    useEffect(() => {
        if(currentGuess == props.userChoice) {
            props.onGameOver({guessRounds});
        }
    }, [currentGuess, guessRounds]);
    
    const nextGuessHandler = (direction) => {
        if(direction == "lower" && props.userChoice > currentGuess) {
            Alert.alert("Don't lie", "You know that this is wrong", [{text: "Sorry!", style: "cancel"}]);
            return;
        }

        if(direction == "greater" && props.userChoice < currentGuess) {
            Alert.alert("Don't lie", "You know that this is wrong", [{text: "Sorry!", style: "cancel"}]);
            return;
        }

        if(direction == "lower") {
            currentHigh.current = parseInt(currentGuess) - 1;
        }

        if(direction == "greater") {
            currentLow.current = parseInt(currentGuess) + 1;
        }

        const val = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(val);
        setGuessRounds(guessRounds + 1);
        setPastGuesses([val.toString(), ...pastGuesses]);
    };

    if(screenHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.bodyText} >Oponnent's Guess</Text>


                <View style={styles.controls}>
                    <MainButton onPress={() => { nextGuessHandler("lower") }}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                    </MainButton>
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    <MainButton onPress={() => {nextGuessHandler("greater")}}>
                        <Ionicons name="md-add" size={24} color="white"/>
                    </MainButton>
                </View>


         
               
                    {/*<ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>*/}
                    <View style={styles.listContainerSmall}>
    
                    <FlatList 
                        contentContainerStyle={styles.listSmall}
                        keyExtractor={(item) => item} 
                        data={pastGuesses} 
                        renderItem={(itemData) => renderListItem(pastGuesses.length, itemData)} />
                    </View>
                
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText} >Oponnent's Guess</Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => { nextGuessHandler("lower") }}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={() => {nextGuessHandler("greater")}}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
           
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>*/}
                <View style={styles.listContainer}>

                <FlatList 
                    contentContainerStyle={styles.list}
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={(itemData) => renderListItem(pastGuesses.length, itemData)} />
                </View>
            
        </View>
    );
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    controls: {
        borderWidth: 2,
        width: "80%",
        borderColor: "black",
        //flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        //marginTop: 20,
        marginTop: Dimensions.get("window").height > 600 ? 20: 5,
        width: 400,
        maxWidth: "100%"
    },
    listContainer: {
        flex: 1,
        alignItems: "center",
        width: "60%",
        //borderWidth: 2,
        //borderColor: "red",
        position: "relative"
    },
    list: {
        flexGrow: 1,
        width: "60%",
        justifyContent: "flex-end",
        //borderWidth: 2,
        //borderColor: "black"
    },
    listSmall: {
        flexGrow: 1,
        width: "50%",
        justifyContent: "flex-end",
        //borderWidth: 2,
        //borderColor: "black"
    },
    listContainerSmall: {
        flex: 1,
        alignItems: "center",
        width: "50%",
        //borderWidth: 2,
        //borderColor: "red",
        position: "relative"
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    }
});

export default GameScreen;