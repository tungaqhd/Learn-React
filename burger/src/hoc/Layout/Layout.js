import React, { Component } from "react";
import {connect} from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Aux from "../Auxu/auxu";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedhandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedhandler}
        />
        <div>Toolbar, SideDrawler, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
}

export default connect(mapStateToProps, null)(Layout);
