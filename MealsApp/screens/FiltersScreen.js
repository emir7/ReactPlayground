import React, {useLayoutEffect, useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Switch} from "react-native";
import NavHeaderButton from "../components/NavHeaderButton";
import Colors from "../constants/Colors";
import SaveFilterHeaderWrapper from "../components/SaveFilterHeaderButton";

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{true: Colors.primaryColor, false: '#ccc'}}
                thumbColor={Colors.primaryColor}
                value={props.isGlutenFree} 
                onValueChange={(newValue) => props.setIsGlutenFree(newValue)} />
        </View>
    );
};

const FiltersScreen = (props) => {

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilter = {
            isGlutenFree,
            isLactoseFree,
            isVegan,
            isVegetarian
        };

        return appliedFilter;
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

    useEffect(() => {
        props.navigation.setParams({save: saveFilters})
    }, [saveFilters, props?.navigation])

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
                />
            )
        });

    }, [props?.navigation, props?.route])

    return (
        <View style={styles.screen}>
            <Text style={styles.title} >Available Filters / Restrictions</Text>
            <FilterSwitch
                label={"Gluten-free"} 
                isGlutenFree={isGlutenFree}
                setIsGlutenFree={setIsGlutenFree}
            />
            <FilterSwitch
                label={"Lactose-free"} 
                isGlutenFree={isLactoseFree}
                setIsGlutenFree={setIsLactoseFree}
            />
            <FilterSwitch
                label={"Vegan"} 
                isGlutenFree={isVegan}
                setIsGlutenFree={setIsVegan}
            />
            <FilterSwitch
                label={"Vegetarian"} 
                isGlutenFree={isVegetarian}
                setIsGlutenFree={setIsVegetarian}
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