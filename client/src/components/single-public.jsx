import React, { Component } from "react";
import Swal from "sweetalert2";
import { apiUrl } from "../config.json";

import httpService from "../services/httpService";

class SinglePublic extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.darkBoxRef = React.createRef();
  }
  state = {
    random: Number,
  };

  componentDidMount = () => {
    this._isMounted = true;
    document.body.addEventListener("click", () => {
      if (this._isMounted) {
        this.darkBoxRef.current.className = "d-none";
      }
    });
    let random = Math.round(Math.random() * 2) + 1;
    this.setState({ random });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  setFavorite = async () => {
    const { art, user } = this.props;
    Swal.fire({
      title: `Would you like to set "${art.artName}" as favorite?`,
      showCancelButton: true,
      confirmButtonColor: "#189ad3",
      cancelButtonColor: "#e0301e",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.value && user) {
        try {
          Swal.fire({
            title: `${art.artName} has been added to favorites`,
            confirmButtonColor: "#189ad3",
            confirmButtonText: "Ok",
          });
          return await httpService.put(`${apiUrl}/users/set-favorite`, art);
        } catch (error) {
          Swal.fire({
            title: `"${art.artName}" is already in favorites`,
            confirmButtonColor: "#e0301e",
            confirmButtonText: "Ok",
          });
          return;
        }
      }
      if (!user) {
        Swal.fire({
          title: `Seems like you are not signed in`,
          showCancelButton: true,
          cancelButtonColor: "#e0301e",
          confirmButtonColor: "	#493267",
          confirmButtonText: "Sign in",
        }).then((result) => {
          if (result.value) {
            window.location = "/sign-in";
          }
        });
      }
    });
  };

  showMoreInfo = () => {
    let searchBar = document.getElementById("searchBar");
    searchBar.className =
      "d-flex justify-content-center animate__fadeInUp animate__animated animate__delay-2s";
    this.darkBoxRef.current.className =
      "dark container-fluid center text-center";
  };

  render() {
    const { art } = this.props;
    const { random } = this.state;
    return (
      <>
        <div className="col">
          <div className="d-none" ref={this.darkBoxRef}>
            <div className="dark_box bg-white p-3 border rounded animate__bounceInUp animate__animated">
              <img
                src={art.artImage}
                alt={art.artName}
                className="mt-3 darkBoxImage"
              />
              <div className="darkBoxDescriptionContainer text-dark p-4">
                <p className="darkBoxDescription">{art.artDescription}</p>
                <i
                  className="far fa-star fa-3x text-primary"
                  onClick={this.setFavorite}
                ></i>
              </div>
            </div>
          </div>
          <div
            className={`flip-card m-auto mt-4 animate__fadeInLeft animate__animated animate__delay-${random}s`}
            onClick={this.showMoreInfo}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={art.artImage}
                  className="artImage rounded w-100"
                  alt={art.artName}
                  ref={this.imageRef}
                />
              </div>
              <div className="flip-card-back rounded">
                <h5>"{art.artName}"</h5>
                <p>By: {art.creator}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SinglePublic;
