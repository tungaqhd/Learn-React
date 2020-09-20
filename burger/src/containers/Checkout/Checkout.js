import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
class Checkout extends Component {
  state = {
    ingredients:null,
    totalPrice: 0
  };
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  componentWillMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {};
    for (let param of query.entries()) {
      if(param[0] === "price") {
        this.setState({totalPrice: param[1]})
      } else {
        newIngredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: newIngredients });
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelledHandler={this.checkoutCancelledHandler}
          checkoutContinueHandler={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
        />
      </div>
    );
  }
}
export default Checkout;
