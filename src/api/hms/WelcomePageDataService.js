import axios from "axios";
import { URL } from "./static/configurations";
class WelcomePageDataService {
  retriveTotalPatients(username) {
    return axios.get(`${URL}/hms/${username}/allpatients`);
  }
  retriveTotalMedicines(username) {
    return axios.get(`${URL}/hms/${username}/allmedicines`);
  }
  retriveTotalAppointments(username) {
    return axios.get(`${URL}/hms/${username}/allappointments`);
  }
}
export default new WelcomePageDataService();
