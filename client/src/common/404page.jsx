import React, { Component } from "react";

import lock from "../images/icons8-lock-96.png";

class My404Component extends Component {
  state = {};

  navigateToHomepage = () => {
    this.props.history.replace("/");
  };

  render() {
    return (
      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-12">
            <img src={lock} className="img-fluid" alt={lock} />
            <h1>‎This content isn't available right now.‎</h1>
            <button
              className="btn btn-primary mt-2"
              onClick={this.navigateToHomepage}
            >
              Move to homepage
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default My404Component;
