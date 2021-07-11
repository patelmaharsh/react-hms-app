import axios from "axios";
import { URL } from "./static/configurations";
class AppointmentDataService {
  retriveAllAppointments(username) {
    let response = axios.get(`${URL}/hms/${username}/appointments`);
    return response;
  }
  retriveAllAppointmentsByPatientId(username, patientId) {
    let response = axios.get(
      `${URL}/hms/${username}/patients/${patientId}/appointment`
    );
    return response;
  }
  retriveAppointmentByAppointmentId(username, appointmentId) {
    let response = axios.get(
      `${URL}/hms/${username}/appointments/${appointmentId}`
    );
    return response;
  }
  retrivePatientFirstAppointment(username, patientId) {
    let response = axios.get(
      `${URL}/hms/${username}/patients/${patientId}/getfirstappointment`
    );
    return response;
  }
  postAppointmentData(username, appointment) {
    return axios.post(`${URL}/hms/${username}/appointments`, appointment);
  }
}
export default new AppointmentDataService();
