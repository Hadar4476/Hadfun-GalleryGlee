import React, { Component } from "react";

import { toast } from "react-toastify";

import artService from "../services/artService";

class SetPrivate extends Component {
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

  onConfirm = async () => {
    const data = { ...this.state.data };
    data.public = false;
    await artService.editArt(data);
    this.setState({ data });
    toast(
      `Hey ${data.creator}, "${data.artName}" has been reverted to private successfully`,
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
    this.props.history.replace("/");
  };

  onCancel = () => {
    this.props.history.replace("/user-gallery");
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <div className="dark container-fluid center text-center">
          <div className="dark_box p-3 border rounded">
            <h1 className="setPrivate">
              Would you like to set "{data.artName}" as private?
            </h1>
            <img
              src={data.artImage}
              alt={data.artName}
              className="darkBoxImage mt-4"
            />
            <div className="mt-4">
              <button className="btn btn-primary mr-2" onClick={this.onConfirm}>
                Confirm
              </button>
              <button className="btn btn-danger ml-2" onClick={this.onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SetPrivate;
