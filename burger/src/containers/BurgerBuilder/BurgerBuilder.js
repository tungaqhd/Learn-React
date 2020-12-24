import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxu/auxu";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHanler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/burgerBuilder";
import * as actionTypes from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
  };
  componentDidMount = () => {
    this.props.initIngredient();
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  puchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
      search: "?",
    });
  };
  render() {
    const disableInfo = {
      ...this.props.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            disabled={disableInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.puchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice.toFixed(2)}
        ></OrderSummary>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.idToken !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredientName) =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    removeIngredient: (ingredientName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    initIngredient: () => {
      dispatch(burgerBuilderActions.initIngredient());
    },
    onInitPurchase: () => {
      dispatch(actionTypes.purchaseInit());
    },
    onSetAuthRedirectPath: (path) => {
      dispatch(actionTypes.setAuthRedirectPath(path));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHanler(BurgerBuilder, axios));
