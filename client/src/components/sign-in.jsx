import React from "react";

import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "../common/form";

import userService from "../services/userService";

class SignIn extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .min(6)
      .max(255)
      .email()
      .label("Email")
      .error(() => {
        return {
          message: "Invaild email",
        };
      }),
    password: Joi.string()
      .required()
      .min(5)
      .max(1024)
      .label("Password")
      .error(() => {
        return {
          message: "Invaild password",
        };
      }),
  };

  toSignUp = () => {
    this.props.history.replace("/sign-up");
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ errors: { email: error.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 mx-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              className="rounded p-5 mt-4 animate__flipInX animate__animated"
              style={{ border: "2px solid #493267" }}
            >
              {this.renderInput(
                "email",
                "Email:",
                "email",
                "",
                "",
                "#493267",
                "",
                "text-danger"
              )}
              {this.renderInput(
                "password",
                "Password:",
                "password",
                "",
                "",
                "#493267",
                "current-password",
                "text-danger"
              )}
              <div className="d-flex flex-row-reverse mt-4">
                {this.renderBtn(
                  "Sign me in!",
                  "submit",
                  "signInBtn btn text-white",
                  "",
                  "#493267"
                )}
                <button
                  onClick={this.toSignUp}
                  className="noAccountBtn btn text-primary"
                >
                  Don't have an account? Click here!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
