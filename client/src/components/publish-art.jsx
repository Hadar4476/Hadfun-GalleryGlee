import React from "react";

import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "../common/form";

import artService from "../services/artService";
import { Link } from "react-router-dom";

class PublishArt extends Form {
  state = {
    data: { creator: "", artName: "", artDescription: "", artImage: "" },
    errors: {},
  };

  schema = {
    creator: Joi.string()
      .required()
      .min(2)
      .max(255)
      .regex(/^[A-z](?!.*[A-Z_0-9]){2,255}\w+$/)
      .error(() => {
        return {
          message: "Invaild artist's name",
        };
      }),
    artName: Joi.string()
      .required()
      .min(2)
      .max(255)
      .error(() => {
        return {
          message: "Invaild art's name",
        };
      }),
    artDescription: Joi.string()
      .required()
      .min(21)
      .max(650)
      .error(() => {
        return {
          message: "Invaild art's description",
        };
      }),
    artImage: Joi.string()
      .required()
      .min(11)
      .max(1024)
      .error(() => {
        return {
          message: "Invaild art's image",
        };
      }),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.public = false;
    this.setState({ data });
    await artService.publishArt(data);

    toast.dark(
      `Hey ${data.creator}, "${data.artName}" has been published successfully`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    this.props.history.replace("/user-gallery");
  };

  render() {
    return (
      <>
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-primary h1 animate__fadeInUp animate__animated animate__delay-1s">
                Let us get to know you better through your creations, publish
                your art here:
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <form
                onSubmit={this.handleSubmit}
                action=""
                method="POST"
                className="rounded p-5 mt-4 animate__zoomIn animate__animated animate__delay-2s"
                style={{ border: "2px solid #493267" }}
              >
                {this.renderInput("creator", "Artist:")}
                {this.renderInput("artName", "Art name:")}
                {this.renderInput("artImage", "Art URL:")}
                {this.renderTextArea("artDescription", "Describe your art:")}
                {this.renderBtn(
                  "Publish my art",
                  "submit",
                  "btn text-white mt-4",
                  "",
                  "#373854"
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col-12">
              <Link className="btn btn-primary mt-3" to="/user-gallery">
                I've changed my mind!
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PublishArt;
