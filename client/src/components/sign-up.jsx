import React from "react";

import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import Form from "../common/form";

import httpService from "../services/httpService";
import userService from "../services/userService";

import { apiUrl } from "../config.json";

class SignUp extends Form {
  state = {
    data: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
    },
    errors: {},
  };

  schema = {
    first_name: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("First Name")
      .regex(/^[A-z](?!.*[A-Z_0-9]){2,255}\w+$/)
      .error(() => {
        return {
          message: "Invaild first name",
        };
      }),
    last_name: Joi.string()
      .required()
      .min(2)
      .max(255)
      .label("Last Name")
      .regex(/^[A-z](?!.*[A-Z_0-9]){2,255}\w+$/)
      .error(() => {
        return {
          message: "Invaild last name",
        };
      }),
    gender: Joi.string()
      .required()
      .min(4)
      .max(6)
      .label("Gender")
      .regex(/^(male|Male|female|Female)$/),
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
    phone: Joi.string()
      .required()
      .min(9)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone")
      .error(() => {
        return {
          message: "Invaild phone number",
        };
      }),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.artist = false;
    data.favorites = [];
    try {
      await httpService.post(`${apiUrl}/users`, data);
      toast.info(`Thank you for your sign up ${data.first_name}!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.history.replace("/sign-in");
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
          <div className="col text-center mt- 4">
            <h4 className="text-center mt-1">
              Sign up for GalleryGlee and enjoy diffrent arts from diffrent
              young and experience artists!
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              autoComplete="on"
              className="border border-secondary rounded p-5 mt-4 text-white animate__fadeInUp animate__animated"
              style={{ background: "#493267" }}
            >
              {this.renderInput("first_name", "First name:")}
              {this.renderInput("last_name", "Last name:")}
              {this.renderInput("email", "Email:", "email")}
              {this.renderInput(
                "password",
                "Password:",
                "password",
                "",
                "",
                "",
                "current-password"
              )}
              {this.renderInput("phone", "Phone:", "tel")}
              {this.renderGenderSelection()}
              {this.renderBtn(
                "Sign me up!",
                "submit",
                "btn m-auto",
                "#493267",
                "white"
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
