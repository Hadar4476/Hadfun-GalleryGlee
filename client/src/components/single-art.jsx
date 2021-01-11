import React, { Component } from "react";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import artService from "../services/artService";

class SingleArt extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.darkBoxRef = React.createRef();
  }
  state = {};

  componentDidMount = () => {
    this._isMounted = true;
    document.body.addEventListener("click", () => {
      if (this._isMounted) {
        this.darkBoxRef.current.className = "d-none";
      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  showMoreInfo = () => {
    this.darkBoxRef.current.className =
      "dark container-fluid center text-center";
  };

  fireSwal = (art) => {
    Swal.fire({
      title: `Are you sure you want to delete ${art.artName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        artService.deleteArt(art);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setTimeout(() => {
          window.location = "/user-gallery";
        }, 2000);
      }
    });
  };

  render() {
    const { art } = this.props;
    return (
      <>
        <div className="col">
          <div className="d-none" ref={this.darkBoxRef}>
            <div className="dark_box bg-dark p-3 border rounded">
              <img
                src={art.artImage}
                alt={art.artName}
                className="darkBoxImage mt-3"
              />
              <div className="darkBoxDescriptionContainer text-center pl-4 text-white">
                <h2>{art.creator}</h2>
                <h2 className="text-primary">"{art.artName}"</h2>
                <p className="darkBoxDescription">{art.artDescription}</p>
              </div>
            </div>
          </div>
          <div className="card w-19rem">
            <div className="card-body d-flex">
              <div className="animate__rotateInDownLeft animate__animated animate__delay-1s">
                <Link title="Edit" to={`/edit-art/${art._id}`}>
                  <i className="far fa-edit"></i>
                </Link>
              </div>
              <h5 className="card-title m-auto" style={{ cursor: "default" }}>
                "{art.artName}"
              </h5>
              <div
                className="deleteIconContainer animate__rotateInDownRight animate__animated animate__delay-1s"
                title="Delete"
              >
                <i
                  onClick={() => this.fireSwal(art)}
                  className="fas fa-trash text-danger"
                ></i>
              </div>
            </div>
            <img
              src={art.artImage}
              className="artImage grayscale rounded w-100"
              alt={art.artName}
              ref={this.imageRef}
              onClick={this.showMoreInfo}
            />
            <div className="d-flex justify-content-center animate__fadeInUp animate__animated animate__delay-1s">
              {!art.public && (
                <div className="m-3">
                  <Link className="btn btn-dark" to={`/set-public/${art._id}`}>
                    <i className="fas fa-upload mr-3"></i>
                    Set as public
                  </Link>
                </div>
              )}
              {art.public && (
                <div className="m-3">
                  <Link
                    className="brorder border-dark rounded btn btn-white text-dark"
                    to={`/set-private/${art._id}`}
                  >
                    <i className="fas fa-undo mr-3"></i>
                    Set as private
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SingleArt;
