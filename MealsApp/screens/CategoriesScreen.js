import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import NavHeaderButton from "../components/NavHeaderButton";

const CategoriesScreen = (props) => {

    const onPressHandler = (catId) => {
       props.navigation.navigate("CategoryMeals", {
            categoryId: catId
        });
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <NavHeaderButton 
                    navigation={props.navigation} />
            )
        });

    }, [props?.navigation])

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile data={itemData} onPressHandler={onPressHandler} />
        );
    };

    return (
        <FlatList 
            keyExtractor={(item, _) => item.id} 
            data={CATEGORIES} 
            renderItem={renderGridItem} 
            numColumns={2} />
    );
};


export default CategoriesScreen;