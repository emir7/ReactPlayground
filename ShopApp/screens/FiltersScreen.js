import React, {useLayoutEffect, useState} from "react";
import {View, Text, StyleSheet, Switch} from "react-native";
import NavHeaderButton from "../components/NavHeaderButton";
import Colors from "../constants/Colors";
import {useDispatch} from "react-redux";
import SaveFilterHeaderWrapper from "../components/SaveFilterHeaderButton";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{true: Colors.primaryColor, false: '#ccc'}}
                thumbColor={Colors.primaryColor}
                value={props.isGlutenFree} 
                onValueChange={(newValue) => {console.log("ahaa "+newValue); props.setCorrectBoolHandler(newValue)}} />
        </View>
    );
};

const FiltersScreen = (props) => {

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const dispatch = useDispatch();

    const onSaveFilterHandler = () => {
        const appliedFilter = {
            isGlutenFree,
            isLactoseFree,
            isVegan,
            isVegetarian
        };

        dispatch(setFilters(appliedFilter));
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <NavHeaderButton 
                    navigation={props.navigation} />
            ),
            headerRight: () => (
                <SaveFilterHeaderWrapper
                    navigation={props.navigation}
                    route={props.route}
                    onSaveFilterHandler={onSaveFilterHandler}
                />
            )
    }   );

    }, [props?.navigation, props?.route, isGlutenFree, isLactoseFree, isVegan, isVegetarian])

    return (
        <View style={styles.screen}>
            <Text style={styles.title} >Available Filters / Restrictions</Text>
            <FilterSwitch
                label={"Gluten-free"} 
                isGlutenFree={isGlutenFree}
                setCorrectBoolHandler={setIsGlutenFree}
            />
            <FilterSwitch
                label={"Lactose-free"} 
                isGlutenFree={isLactoseFree}
                setCorrectBoolHandler={setIsLactoseFree}
            />
            <FilterSwitch
                label={"Vegan"} 
                isGlutenFree={isVegan}
                setCorrectBoolHandler={setIsVegan}
            />
            <FilterSwitch
                label={"Vegetarian"} 
                isGlutenFree={isVegetarian}
                setCorrectBoolHandler={setIsVegetarian}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        margin: 20,
        textAlign: "center"
    },
    filterContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12
    }
});

export default FiltersScreen;