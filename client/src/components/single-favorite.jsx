import React, { Component } from "react";

class SingleFavorite extends Component {
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
  render() {
    const { favoriteArt, unsetFavorite } = this.props;
    return (
      <>
        <div className="col">
          <div className="d-none" ref={this.darkBoxRef}>
            <div className="dark_box bg-dark p-3 border rounded animate__bounceInUp animate__animated">
              <img
                src={favoriteArt.artImage}
                alt={favoriteArt.artName}
                className="darkBoxImage mt-3"
              />
              <div className="darkBoxDescriptionContainer pl-4 text-white">
                <h2>By: {favoriteArt.creator}</h2>
                <h2 className="text-primary">"{favoriteArt.artName}"</h2>
                <p className="darkBoxDescription">
                  {favoriteArt.artDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="card w-19rem animate__fadeInUp animate__animated animate__delay-1s">
            <div className="card-body d-flex">
              <h5 className="card-title m-auto">"{favoriteArt.artName}"</h5>
              <i
                className="fas fa-star text-primary"
                onClick={() => unsetFavorite(favoriteArt)}
              ></i>
            </div>
            <img
              onMouseOver={(e) =>
                (e.target.className =
                  "artImage animate__pulse animate__animated")
              }
              onMouseLeave={(e) => (e.target.className = "artImage")}
              src={favoriteArt.artImage}
              className="artImage"
              alt={favoriteArt.artName}
              ref={this.imageRef}
              onClick={this.showMoreInfo}
            />
          </div>
        </div>
      </>
    );
  }
}

export default SingleFavorite;
