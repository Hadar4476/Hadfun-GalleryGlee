import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";

import logo from "../images/galleryglee.png";

class Navbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light animate__animated animate__fadeInLeft">
          <div className="container">
            <button
              className="navbar-toggler bg-white"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item m-1 animate__animated animate__fadeInDown animate__delay-1s">
                  <NavLink className="nav-link text-light" to="/about">
                    About
                  </NavLink>
                </li>
                {user && user.artist && (
                  <li className="nav-item m-1 animate__animated animate__fadeInDown animate__delay-1s">
                    <NavLink className="nav-link text-light" to="/user-gallery">
                      My GalleryGlee
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li className="nav-item m-1 animate__animated animate__fadeInDown animate__delay-1s">
                    <NavLink
                      className="nav-link text-primary"
                      to="/user-favorites"
                    >
                      My favorites
                    </NavLink>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav">
                {!user && (
                  <>
                    <li className="nav-item mr-1 m-1 animate__bounceIn animate__animated animate__delay-2s">
                      <span className="badge badge-light">
                        <NavLink className="signInNL nav-link" to="/sign-in">
                          Sign in
                        </NavLink>
                      </span>
                    </li>
                    <li className="nav-item mr-1 m-1 animate__bounceIn animate__animated animate__delay-2s">
                      <span className="badge" style={{ background: "#493267" }}>
                        <NavLink className="nav-link text-light" to="/sign-up">
                          Sign up
                        </NavLink>
                      </span>
                    </li>
                    <li className="nav-item m-1 animate__tada animate__animated animate__delay-2s">
                      <span className="badge" style={{ background: "#7bb3ff" }}>
                        <NavLink
                          className="nav-link text-white"
                          to="/artist-sign-up"
                        >
                          I'm an artist!
                        </NavLink>
                      </span>
                    </li>
                  </>
                )}
                {user && (
                  <li className="nav-item m-1 animate__animated animate__shakeX animate__delay-2s">
                    <span className="badge" style={{ background: "#005b96" }}>
                      <NavLink className="nav-link text-light" to="/log-out">
                        Log out
                      </NavLink>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <Link to="/">
          <div className="ggLogo text-center">
            <img
              className="p-2 animate__animated animate__fadeIn"
              src={logo}
              alt="logo"
            />
          </div>
        </Link>
      </>
    );
  }
}

export default Navbar;
