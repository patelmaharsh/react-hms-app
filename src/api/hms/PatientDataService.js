import axios from "axios";
import { URL } from "./static/configurations";
class PatientDataService {
  retrieveAllPatients(username) {
    return axios.get(`${URL}/hms/${username}/patients`);
  }
  retrievePatient(username, id) {
    let response = axios.get(`${URL}/hms/${username}/patients/${id}`);
    // console.log(response);
    return response;
  }
  deletePatient(username, id) {
    return axios.delete(`${URL}/hms/${username}/patients/${id}`);
  }
  updatePatient(username, patient) {
    return axios.put(`${URL}/hms/${username}/patients`, patient);
  }
  createPatient(username, patient) {
    return axios.post(`${URL}/hms/${username}/patients`, patient);
  }
}

export default new PatientDataService();
