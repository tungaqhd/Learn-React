import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientname: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientname: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};
export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL,
  };
};
export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get("https://burger-app-a7839.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredient(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFail());
      });
  };
};
