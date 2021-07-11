import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";

class NonAuthenticatedRoute extends Component {
  render() {
    if (!AuthenticationService.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return (
        <Redirect to={`/hms/${sessionStorage.getItem("authenticatedUser")}`} />
      );
    }
  }
}
export default NonAuthenticatedRoute;
