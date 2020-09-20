import React, { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Tung",
        address: {
          street: "Test address",
          zipCode: "170000",
          country: "Vietnam",
        },
        email: "tungaqhd@gmail.com",
      },
      deliveryMethod: "Fast",
    };
    axios
      .post("/orders.json", data)
      .then((response) => {
          this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = <Spinner />;
    if (!this.state.loading) {
      form = (
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Your Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="Your Postal Code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
