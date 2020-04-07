import React, { Component } from "react";
class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL");
    }
  }
  render() {
    return <h1>loading......</h1>;
  }
}

export default Callback;
