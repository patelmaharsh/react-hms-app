import axios from "axios";
import { URL } from "./static/configurations";
class LoginDataService {
  getDoctorByUsername(username) {
    // console.log("inside data service");
    let response = axios.get(`${URL}/hms/get/doctor/${username}`);
    // console.log(response);
    return response;
  }
}
export default new LoginDataService();
