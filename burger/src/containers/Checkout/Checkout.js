import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
class Checkout extends Component {
  componentWillMount() {
    this.props.onInitPurchase();
  }
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelledHandler={this.checkoutCancelledHandler}
            checkoutContinueHandler={this.checkoutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
