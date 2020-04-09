import React, { Component } from "react";

class Public extends Component {
  state = {
    message: "",
  };
  componentDidMount() {
    fetch("/public")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network responce was not OK");
      })
      .then((response) =>
        this.setState({ message: response.message }).catch((error) =>
          this.setState({ message: error })
        )
      );
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Public;
