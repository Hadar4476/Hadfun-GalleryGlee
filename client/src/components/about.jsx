import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="container text-center mt-4 animate__bounceInUp animate__animated">
        <h1 className="display-4 text-primary">About GalleryGlee</h1>
        <div className="row">
          <div className="col text-left">
            <p className="aboutP pt-4 h5">
              GalleryGlee is a place for young/ experience artists who would
              like to share their creations with others or complementing
              others's creations by favoriting them.
              <br></br>
              GalleryGlee is also a place for those who are interested in art
              but can't create it by themselves.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
