import React, { Component } from "react";

import Swal from "sweetalert2";

import SingleFavorite from "./single-favorite";

import getJwt from "../services/storageService";
import userService from "../services/userService";
import httpService from "../services/httpService";
import { apiUrl } from "../config.json";

class Favorites extends Component {
  state = {
    userFavorites: [],
  };

  componentDidMount = async () => {
    const token = getJwt.getJwtToken();
    const user = userService.getCurrentUser();
    this.setState({ user });

    if (token) {
      try {
        const { data } = await httpService.get(`${apiUrl}/users/my-favorites`);
        if (user && data) {
          this.setState({ userFavorites: data });
        }
      } catch (error) {
        return;
      }
    }
  };

  unsetFavorite = (favoriteArt) => {
    const { userFavorites } = this.state;
    Swal.fire({
      title: `Are you sure you want to remove "${favoriteArt.artName}" from favorites?`,
      showCancelButton: true,
      confirmButtonColor: "#189ad3",
      cancelButtonColor: "#e0301e",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.value) {
        Swal.fire({
          title: `"${favoriteArt.artName}" has been removed from favorites`,
          confirmButtonColor: "#189ad3",
          confirmButtonText: "Ok",
        });
        const index = userFavorites.indexOf(favoriteArt);
        if (index > -1) {
          userFavorites.splice(index, 1);
          this.setState(userFavorites);
        }
        return await httpService.put(
          `${apiUrl}/users/unset-favorite`,
          userFavorites
        );
      }
    });
  };

  render() {
    const { userFavorites } = this.state;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col text-center">
            {userFavorites.length === 0 && (
              <>
                <p className="h3 text-primary animate__fadeIn animate__animated animate__delay-1s">
                  Seems you yet to add arts to your favorites,
                </p>
                <button
                  onClick={() => this.props.history.replace("/")}
                  className="btn btn-primary m-auto animate__fadeInUp animate__animated animate__delay-1s"
                >
                  Click here to add your favorites!
                </button>
              </>
            )}
          </div>
        </div>
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
            {userFavorites.length > 0 &&
              userFavorites.map((favoriteArt) => (
                <SingleFavorite
                  unsetFavorite={() => this.unsetFavorite(favoriteArt)}
                  userFavorites={userFavorites}
                  key={favoriteArt._id}
                  favoriteArt={favoriteArt}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
