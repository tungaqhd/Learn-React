import * as actionTypes from "../actions/actionTypes";
const initialSate = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 0,
};
const INGREDIENT_PRICE = {
  salad: 1.2,
  bacon: 2.4,
  cheese: 3.6,
  meat: 4,
};
const reducer = (state = initialSate, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice+INGREDIENT_PRICE[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName]-1
        },
        totalPrice: state.totalPrice-INGREDIENT_PRICE[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;