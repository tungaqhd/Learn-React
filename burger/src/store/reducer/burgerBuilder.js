import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";
const initialSate = {
  ingredients: null,
  totalPrice: 0,
  error: false
};
const INGREDIENT_PRICE = {
  salad: 1.2,
  bacon: 2.4,
  cheese: 3.6,
  meat: 4,
};
const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true
  });
};
const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  return updateObject(state, {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    building: true
  });
};
const setIngredient = (state, action) => {
  return {
    ...state,
    totalPrice: 0,
    ingredients: action.ingredients,
    building: false
  };
};
const reducer = (state = initialSate, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    default:
      return state;
  }
};

export default reducer;
