import axios from "axios";
import { URL } from "./static/configurations";
class StatsDataService {
  retriveCaseFees(username) {
    return axios.get(`${URL}/hms/${username}/getsumcasefees`);
  }
  retriveAllBills(username) {
    return axios.get(`${URL}/hms/${username}/getsumallfees`);
  }
  retriveMedicineBills(username) {
    return axios.get(`${URL}/hms/${username}/getsummedicine`);
  }
}
export default new StatsDataService();
