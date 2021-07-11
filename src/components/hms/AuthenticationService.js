class AuthenticationService {
  registerSuccessfulLogin(username, id) {
    console.log("registerSuccesfulLogin");
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("authenticatedUserId", id);
  }
  logout() {
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("authenticatedUserId");
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }
}
export default new AuthenticationService();
