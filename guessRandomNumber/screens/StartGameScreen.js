import React, {useEffect, useState} from "react";
import {
    View, 
    StyleSheet,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView
} from "react-native"

import Card from "../components/Card"
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""))
    };

    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4);
        };
    
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        }
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number!", 
                "Number has to be a number between 1 and 99", 
                [{text: "Okay", style: "destructive", onPress: resetInputHandler}])
            return;
        }

        setEnteredValue("");
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton onPress={() => {props.startGameHandler(selectedNumber)}} >
                    Start Game
                </MainButton>
            </Card>);
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>       
                    
                    <View style={styles.screen}>
                    <Text style={styles.title} >Start a New Game!</Text>
                    <Card style={styles.inputContainer}>
                        <BodyText>Select a Number</BodyText>
                        <Input 
                            style={styles.input} 
                            blurOnSubmit
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText={numberInputHandler}
                            value={enteredValue} />
                        <View style={styles.buttonContainer}>
                            <View style={{width: buttonWidth, marginTop: 10}}>
                                <Button title="Reset" onPress={() => {resetInputHandler()}} color={Colors.accent} />
                            </View>
                            <View style={{width: buttonWidth, marginTop: 10}}>
                                <Button title="Confirm" onPress={() => {confirmInputHandler()} } color={Colors.primary}/>
                            </View>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </ScrollView>
 
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold"
    },
    inputContainer: {
        width: "80%",
        minWidth: 300,
        maxWidth: "95%",
        alignItems: "center"
    },
    buttonWrapper: {
        //width: 100,
        width: Dimensions.get("window").width / 4,
        marginTop: 10
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    }
});

export default StartGameScreen;