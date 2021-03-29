import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS} from "../actions/meals";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FAVORITE: 
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id == action.mealId);
            if(existingIndex > -1) {
                const updatedElements = [...state.favoriteMeals];
                updatedElements.splice(existingIndex, 1);
                return {
                    ...state,
                    favoriteMeals: updatedElements
                }
            }else {
                const meal = state.meals.find(meal => meal.id == action.mealId);
                return {
                        ...state,
                        favoriteMeals: [...state.favoriteMeals, meal]
                    };
            }
        case SET_FILTERS: 
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                
                if(appliedFilters.isGlutenFree && !meal.isGlutenFree) {
                    return false;
                }

                if(appliedFilters.isLactoseFree && !meal.isLactoseFree) {
                    return false;
                }

                if(appliedFilters.isVegetarian && !meal.isVegetarian) {
                    return false;
                }

                if(appliedFilters.isVegan && !meal.isVegan) {
                    return false;
                }

                return true;
            });


            return {
                ...state,
                filteredMeals: updatedFilteredMeals
            }

        default:
            return state;
    }
};

export default mealsReducer;