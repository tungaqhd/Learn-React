import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Redirect, Switch } from "react-router-dom";
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Layout>
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Layout>
          <Switch>
            <Route path="/auth" exact component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      );
    }
    return <div className="App">{routes}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};
const mapDispatchToProps = (dispath) => {
  return {
    onTryAutoSignup: () => dispath(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
