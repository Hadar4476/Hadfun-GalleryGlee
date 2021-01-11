import React, { Component } from "react";

import SingleArt from "./single-art";

import add from "../images/plus.png";

import artService from "../services/artService";
import getJwt from "../services/storageService";
import httpService from "../services/httpService";
import { apiUrl } from "../config.json";

class Gallery extends Component {
  state = {
    arts: [],
    user: {},
  };

  async componentDidMount() {
    const { data } = await artService.getMyArt();
    if (data.length > 0) this.setState({ arts: data });
    const token = getJwt.getJwtToken();
    if (token) {
      try {
        const { data } = await httpService.get(`${apiUrl}/users/me`, token);
        this.setState({ user: data });
      } catch (error) {
        return;
      }
    }
  }

  navigateToPublishArt = () => {
    this.props.history.replace("/publish-art");
  };

  render() {
    const { arts, user } = this.state;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col text-center animate__fadeInUp animate__animated animate__delay-1s">
            <h1 className="galleryPageTitle text-primary">
              Hello {user.first_name}, this is your gallery
            </h1>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center animate__fadeIn animate__animated animate__delay-2s">
            <p className="h4 m-auto">
              Here you can upload your creations, set them as public so everyone
              can see(you can set them as private at any time you want), edit
              them if you would wike to and delete them.
            </p>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
            <div className="col mt-4 text-center animate__zoomInLeft animate__animated animate__delay-1s">
              <h3 className="card-title mt-3 text-primary">
                Add art <i className="fas fa-plus-square"></i>
              </h3>
              <div className="card-body">
                <img
                  onMouseOver={(e) =>
                    (e.target.className =
                      "addImage w-50 mt-4 rounded-circle animate__jello animate__animated")
                  }
                  onMouseLeave={(e) =>
                    (e.target.className = "addImage w-50 mt-4 rounded-circle")
                  }
                  onClick={this.navigateToPublishArt}
                  src={add}
                  className="addImage w-50 mt-4 rounded-circle"
                  alt="add art icon"
                />
              </div>
            </div>
            {arts.length > 0 &&
              arts.map((art) => <SingleArt key={art._id} art={art} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
