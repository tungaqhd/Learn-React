import React, { Component } from "react";
import Aux from "../Auxu/auxu";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHanler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: false,
    };
    componentDidMount = () => {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: false });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmhandler = () => {
      this.setState({ error: false });
    }
    render() {
      return (
        <Aux>
          <Modal modalClosed={this.errorConfirmhandler} show={this.state.error}>
            {this.state.error.message?this.state.error.message:null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHanler;
