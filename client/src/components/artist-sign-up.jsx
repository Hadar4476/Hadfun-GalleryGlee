import React from "react";

import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import Form from "../common/form";

import httpService from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";

class ArtSignUp extends Form {
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
    data.artist = true;
    data.favorites = [];
    try {
      await httpService.post(`${apiUrl}/users`, data);
      await userService.login(data.email, data.password);
      window.location = "/publish-art";
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
          <div className="col-12 text-center mt- 4">
            <h1 className="display-4 mt-2">Hey There Artist</h1>
            <h4 className="text-center mt-1">
              Create your artist's account here for the world to see your art!
            </h4>
            <h6>
              Share your art with us so the world can see your passion and
              creativity!
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              autoComplete="off"
              className="border border-secondary rounded p-5 mt-4 text-dark animate__rubberBand animate__animated"
              style={{
                background: "#7bb3ff",
              }}
            >
              {this.renderInput(
                "first_name",
                "First name:",
                "",
                "",
                "",
                "",
                "",
                "text-white"
              )}
              {this.renderInput(
                "last_name",
                "Last Name:",
                "",
                "",
                "",
                "",
                "",
                "text-white"
              )}
              {this.renderInput(
                "email",
                "Email:",
                "email",
                "",
                "",
                "",
                "",
                "text-white"
              )}
              {this.renderInput(
                "password",
                "Password:",
                "password",
                "",
                "",
                "",
                "current-password",
                "text-white"
              )}
              {this.renderInput(
                "phone",
                "Phone:",
                "tel",
                "",
                "",
                "",
                "",
                "text-white"
              )}
              {this.renderGenderSelection()}
              {this.renderBtn("Next", "submit", "btn m-auto", "#fff", "black")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtSignUp;
