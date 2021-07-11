import axios from "axios";
import { URL } from "./static/configurations";
class MedicineDataService {
  retrieveAllMedicines(username) {
    return axios.get(`${URL}/hms/${username}/medicines`);
  }
  retrieveMedicine(username, id) {
    let response = axios.get(`${URL}/hms/${username}/medicines/${id}`);
    // console.log(response);
    return response;
  }
  deleteMedicine(username, id) {
    return axios.delete(`${URL}/hms/${username}/medicines/${id}`);
  }
  updateMedicine(username, medicine) {
    return axios.put(`${URL}/hms/${username}/medicines`, medicine);
  }
  updateMedicineStockByMedicineName(username, medicineName, stock) {
    return axios.put(
      `${URL}/hms/${username}/medicines/${medicineName}/${stock}`
    );
  }
  createMedicine(username, medicine) {
    return axios.post(`${URL}/hms/${username}/medicines`, medicine);
  }
}

export default new MedicineDataService();
