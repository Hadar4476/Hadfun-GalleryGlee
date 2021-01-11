import React, { Component } from "react";
import "./App.css";

import axios from "axios";
import httpService from "./services/httpService";
import { apiUrl } from "./config.json";
import getJwt from "./services/storageService";

import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import LogOut from "./components/logout";
import ArtSignUp from "./components/artist-sign-up";
import PublishArt from "./components/publish-art";
import ProtectedRoute from "./common/protected-route";
import My404Component from "./common/404page";
import EditArt from "./components/edit-art";
import SetPublic from "./components/set-public";
import SetPrivate from "./components/set-private";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import userService from "./services/userService";
import Favorites from "./components/favorites";

class App extends Component {
  state = {};

  componentDidMount = async () => {
    axios.defaults.headers.common["x-auth-token"] = getJwt.getJwtToken();
    const token = getJwt.getJwtToken();
    const user = userService.getCurrentUser();
    this.setState({ user });
    if (token) {
      try {
        const { data } = await httpService.get(`${apiUrl}/users/me`, token);
        if (user && data) {
          toast(`👋 Hello ${data.first_name}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        return;
      }
    }
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: "900px" }}>
          <Switch>
            <ProtectedRoute
              path="/set-private/:id"
              component={SetPrivate}
              artist={true}
            />
            <ProtectedRoute
              path="/set-public/:id"
              component={SetPublic}
              artist={true}
            />
            <ProtectedRoute
              path="/edit-art/:id"
              component={EditArt}
              artist={true}
            />
            <ProtectedRoute
              path="/user-gallery"
              component={Gallery}
              artist={true}
            />
            <ProtectedRoute path="/user-favorites" component={Favorites} />
            <ProtectedRoute
              path="/publish-art"
              component={PublishArt}
              artist={true}
            />
            <Route path="/artist-sign-up" component={ArtSignUp} />
            <Route path="/log-out" component={LogOut} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
            <Route path="*" exact={true} component={My404Component} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
