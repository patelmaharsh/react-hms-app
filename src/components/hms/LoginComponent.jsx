import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";
import LoginDataService from "../../api/hms/LoginDataService.js";

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",

      hasLoginFailed: false,
      showSuccessMessage: false,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        {this.state.hasLoginFailed && (
          <div className="alert alert-warning">Invalid Credentials!</div>
        )}
        {this.state.showSuccessMessage && <div>Login Success</div>}
        Username :
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleFormChange}
        />
        Password :
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleFormChange}
        />
        <button className="btn btn-success ml-3" onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }

  handleLogin() {
    LoginDataService.getDoctorByUsername(this.state.username).then(
      (response) => {
        // console.log(response.data);
        if (response.data) {
          if (response.data.password === this.state.password) {
            AuthenticationService.registerSuccessfulLogin(
              this.state.username,
              response.data.id
            );
            this.props.history.push(`/hms/${this.state.username}`);
            window.location.reload();
          } else {
            this.setState({
              hasLoginFailed: true,
              showSuccessMessage: false,
              password: "",
            });
          }
        } else {
          this.setState({
            hasLoginFailed: true,
            showSuccessMessage: false,
            password: "",
          });
        }
      }
    );
  }
  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
}
export default LoginComponent;
