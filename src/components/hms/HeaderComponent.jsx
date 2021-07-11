import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component {
  render() {
    return (
      <div className="header no-gutters">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <Link className="navbar-brand" to="/">
              Maharsh
            </Link>
          </div>
          <ul className="navbar-nav"></ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!AuthenticationService.isUserLoggedIn() && (
              <li>
                <Link className="nav-link" to="/hms/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;
