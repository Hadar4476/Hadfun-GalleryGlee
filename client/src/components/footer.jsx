import React from "react";

const Footer = () => {
  let date = new Date();
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <p className="text-muted">GalleryGlee &copy; {date.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
