import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter } from "react-router-dom";

import "animate.css/animate.css";
import "../src/css/home.css";
import "../src/css/navbar.css";
import "../src/css/gallery.css";
import "../src/css/darkbox.css";
import "../src/css/single-art.css";
import "../src/css/single-public.css";
import "../src/css/private-public.css";
import "../src/css/sign-in.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
