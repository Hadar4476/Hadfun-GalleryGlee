import React, { Component } from "react";

import $ from "jquery";

import SinglePublic from "../components/single-public";

import artService from "../services/artService";
import userService from "../services/userService";

class Home extends Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.darkBoxRef = React.createRef();
    this.artSource = this.state.arts;
  }

  state = {
    arts: [],
    user: {},
  };

  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      document.body.addEventListener("click", () => {
        if (this.dropdown) this.darkBoxRef.current.className = "d-none";
      });
      const { data } = await artService.getPublic();
      this.artSource = data;
      if (data.length > 0) {
        this.setState({ arts: this.artSource });
      }
      const user = userService.getCurrentUser();
      this.setState({ user });
      var width = $(window).width();
      if (width <= 974) {
        $("#mobileModerator").removeClass("d-none");
      } else {
        $("#mobileModerator").addClass("d-none");
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  resetSearch = async (e) => {
    this.darkBoxRef.current.className =
      "dark container-fluid center text-center";
    if (!e.target.value) {
      const { data } = await artService.getPublic();
      this.artSource = data;
      if (data.length > 0) {
        this.setState({ arts: this.artSource });
      }
    }
  };

  onInputClick = (e) => {
    e.target.placeholder = "";
    let searchBar = document.getElementById("searchBar");
    searchBar.className =
      "searchBar d-flex justify-content-center animate__fadeInUp animate__animated animate__delay-2s";
    this.darkBoxRef.current.className =
      "dark container-fluid center text-center";
  };

  onEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.searchArt();
      e.preventDefault();
    }
  };

  searchArt = () => {
    const input = document.getElementById("search_input").value;
    if (!input) return;
    this.darkBoxRef.current.className = "d-none";
    const searchedArts = this.artSource.filter((art) => {
      return (
        art.artName.toLowerCase().includes(input.toLowerCase()) ||
        art.creator.toLowerCase().includes(input.toLowerCase())
      );
    });
    this.setState({ arts: searchedArts });
  };

  render() {
    const { arts, user } = this.state;
    return (
      <div className="container">
        <div
          id="searchBar"
          className="searchBar d-flex justify-content-center animate__fadeInUp animate__animated"
        >
          <input
            autoComplete="on"
            type="search"
            className="searchInput form-control m-1"
            id="search_input"
            placeholder="Type Artist Or Art's Name Here..."
            onBlur={(e) => {
              e.target.placeholder = "Type Artist Or Art's Name Here...";
            }}
            onClick={this.onInputClick}
            onKeyUp={this.onEnterKey}
            onChange={this.resetSearch}
          />
          <button
            className="searchBtn btn btn-primary rounded ml-2 text-white p-2 m-1"
            onClick={this.searchArt}
          >
            Search
          </button>
        </div>
        <div id="mobileModerator" className="container d-none">
          <div className="row">
            <div className="col">
              <p>
                * Hold your finger on a card to reveal its creator and name.
              </p>
            </div>
          </div>
        </div>
        <div className="d-none" ref={this.darkBoxRef}></div>
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
            {arts.length > 0 &&
              arts.map((art) => (
                <SinglePublic key={art._id} art={art} user={user} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
