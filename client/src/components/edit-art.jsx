import React from "react";

import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Form from "../common/form";

import artService from "../services/artService";

class EditArt extends Form {
  state = {
    data: {
      _id: "",
      creator: "",
      artName: "",
      artDescription: "",
      artImage: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
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

  async componentDidMount() {
    const artId = this.props.match.params.id;
    const { data } = await artService.getArt(artId);
    this.setState({ data: this.mapToView(data) });
  }

  mapToView(art) {
    return {
      _id: art._id,
      creator: art.creator,
      artName: art.artName,
      artDescription: art.artDescription,
      artImage: art.artImage,
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.public = false;
    await artService.editArt(data);
    this.setState({ data });
    toast(
      `Hey ${data.creator}, "${data.artName}" has been updated successfully`,
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
              <p className="h1 animate__animated animate__fadeInUp animate__delay-1s">
                Edit your art here!
              </p>
              <p className="h2 animate__fadeInLeft animate__animated animate__delay-2s">
                If you have changed your mind about a specific creation, this is
                the place for you, here you can edit, change and update your
                art.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <form
                onSubmit={this.handleSubmit}
                action=""
                method="POST"
                className="rounded p-5 mt-4 animate__tada animate__animated"
                style={{ border: "2px solid #493267" }}
              >
                {this.renderInput("creator", "Artist:")}
                {this.renderInput("artName", "Art name:")}
                {this.renderInput("artImage", "Art URL:")}
                {this.renderTextArea("artDescription", "Describe your art:")}
                {this.renderBtn(
                  "Finish",
                  "submit",
                  "btn btn-success text-white mt-4",
                  "",
                  ""
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

export default EditArt;
