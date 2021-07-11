import { Component } from "react";
import VerticalNavComponent from "../hms/VerticalNavComponent";
import AppointmentDataService from "../../api/hms/AppointmentDataService.js";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import { Field, Form, Formik } from "formik";
import MedicineDataService from "../../api/hms/MedicineDataService.js";
import LoginDataService from "../../api/hms/LoginDataService";
import { DoctorUsername } from "../../api/hms/static/configurations";
class AppointmentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.match.params.id,
      doctorid: DoctorUsername,
      caseFees: "",
      prescription: "",
      totalBill: 0,
      pastAppointments: [],
      allMedicines: [],
      selectedMedicines: {},
      oldCaseFees: 0,
      newCaseFees: 0,
    };
    this.onGenerateBill = this.onGenerateBill.bind(this);
  }
  addToSelectedMedicine = (medicine) => {
    if (this.state.selectedMedicines[medicine.name]) {
      return;
    }
    let medicines = this.state.selectedMedicines;
    medicines[medicine.name] = 0;
    this.setState({
      selectedMedicines: medicines,
    });
  };
  handleDeleteMedicine = (key) => {
    let removedMedicineObj = this.state.selectedMedicines;
    let allMedicines = this.state.allMedicines;
    let totalBill = this.state.totalBill;
    allMedicines.forEach((medicine) => {
      if (medicine.name === key) {
        medicine.availableStock =
          medicine.availableStock + removedMedicineObj[key];
        totalBill = totalBill - medicine.sellPrice * removedMedicineObj[key];
      }
    });
    delete removedMedicineObj[key];
    this.setState({
      selectedMedicines: removedMedicineObj,
      allMedicines: allMedicines,
      totalBill: totalBill,
    });
  };
  getValueForCaseFees = () => {
    AppointmentDataService.retrivePatientFirstAppointment(
      DoctorUsername,
      this.state.patientId
    ).then((response) => {
      let caseFees;
      if (response.data) caseFees = this.state.oldCaseFees;
      else caseFees = this.state.newCaseFees;
      this.setState({
        caseFees: caseFees,
        totalBill: caseFees,
      });
    });
  };
  setCaseFees = () => {
    LoginDataService.getDoctorByUsername(DoctorUsername).then((response) => {
      this.setState({
        oldCaseFees: response.data.oldCaseFees,
        newCaseFees: response.data.newCaseFees,
      });
    });
  };

  componentDidMount() {
    AppointmentDataService.retriveAllAppointmentsByPatientId(
      DoctorUsername,
      this.props.match.params.id
    ).then((response) => {
      this.setState({
        pastAppointments: response.data,
      });
    });
    MedicineDataService.retrieveAllMedicines(DoctorUsername).then(
      (response) => {
        this.setState({
          allMedicines: response.data,
        });
      }
    );
    this.setCaseFees();
    this.getValueForCaseFees();
  }
  handleAddCount = (key) => {
    let newObj = this.state.selectedMedicines;
    let newAllMedicines = this.state.allMedicines;
    let count = 0;
    newAllMedicines.forEach((medicine) => {
      if (medicine.name === key) {
        count = parseInt(medicine.availableStock);
      }
    });
    if (count > 0) {
      let totalBill = this.state.totalBill;
      newObj[key] = newObj[key] + 1;
      newAllMedicines.forEach((medicine) => {
        if (medicine.name === key) {
          totalBill = totalBill + medicine.sellPrice;
          medicine.availableStock--;
        }
      });
      this.setState({
        selectedMedicines: newObj,
        allMedicines: newAllMedicines,
        totalBill: totalBill,
      });
    }
  };
  handleMinusCount = (key) => {
    let newObj = this.state.selectedMedicines;
    let newAllMedicines = this.state.allMedicines;
    if (newObj[key] > 0) {
      let totalBill = this.state.totalBill;
      newAllMedicines.forEach((medicine) => {
        if (medicine.name === key) {
          medicine.availableStock++;
          totalBill = totalBill - medicine.sellPrice;
        }
      });
      newObj[key] = newObj[key] - 1;
      this.setState({
        selectedMedicines: newObj,
        allMedicines: newAllMedicines,
        totalBill: totalBill,
      });
    }
  };
  json2keys = (json) => {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push(key);
    });
    return result;
  };
  onGenerateBill(values) {
    let appointment = values;
    appointment["timestamp"] = moment().format();
    AppointmentDataService.postAppointmentData(
      DoctorUsername,
      appointment
    ).then((response) => {
      let keys = Object.keys(appointment.medicines);
      keys.forEach((key) => {
        MedicineDataService.updateMedicineStockByMedicineName(
          DoctorUsername,
          key,
          appointment.medicines[key]
        );
      });
      this.props.history.push(
        `/hms/${DoctorUsername}/appointments/${response.data}`
      );
    });
  }
  ViewAppointmentDetailPage = (appointmentId) => {
    this.props.history.push(
      `/hms/${DoctorUsername}/appointments/${appointmentId}`
    );
  };
  render() {
    const pastAppointments = this.state.pastAppointments.sort((a, b) => {
      if (a.timestamp > b.timestamp) return -1;
      return a.timestamp < b.timestamp ? 1 : 0;
    });
    const allMedicines = this.state.allMedicines.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
    });
    const arrOfKeys = this.json2keys(this.state.selectedMedicines);

    let totalBill = this.state.totalBill;
    let caseFees = this.state.caseFees;
    let medicines = this.state.selectedMedicines;
    let doctorId = parseInt(this.state.doctorid);
    let patientId = parseInt(this.state.patientId);

    return (
      <div className="row content no-gutters">
        <VerticalNavComponent />
        <div className="col-sm-10 border-left relativePosition">
          <h3 className="mt-4 mb-5">Appointment Page</h3>
          <div className="container mt-4 mb-5">
            <h4 className="mb-4 ">Book an Appointment</h4>
            <div className="container text-left">
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label className="text-muted">Selected Medicines</label>
                  <div className="selectedMedicines">
                    {arrOfKeys.map((key) => (
                      <div
                        className="row w-100 rounded m-2 p-2 bg-light text-right border"
                        key={key}
                      >
                        {key}{" "}
                        <div className="div-right">
                          <button
                            className="add-remove-fonts"
                            onClick={() => this.handleMinusCount(key)}
                          >
                            <RemoveIcon fontSize="inherit" />
                          </button>
                          <button className="add-remove-fonts bg-light">
                            {this.state.selectedMedicines[key]}
                          </button>

                          <button
                            className="add-remove-fonts"
                            onClick={() => this.handleAddCount(key)}
                          >
                            <AddIcon fontSize="inherit" />
                          </button>
                          <button
                            className="add-remove-fonts"
                            onClick={() => this.handleDeleteMedicine(key)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group col-md-6 ml-4 border p-2">
                  <span className="text-muted">All Medicines</span>
                  <div className="">
                    {allMedicines.map((medicine) => (
                      <button
                        key={medicine.id}
                        className="btn btn-light m-2"
                        onClick={() => this.addToSelectedMedicine(medicine)}
                      >
                        {medicine.name}-{medicine.availableStock}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <div>
                  <Formik
                    initialValues={{
                      totalBill,
                      caseFees,
                      medicines,
                      doctorId,
                      patientId,
                    }}
                    onSubmit={this.onGenerateBill}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize={true}
                  >
                    {({ errors, touched, validateField, validateForm }) => (
                      <Form>
                        <Field type="hidden" name="totalBill"></Field>
                        <Field type="hidden" name="caseFees"></Field>
                        <Field type="hidden" name="medicines"></Field>
                        <Field type="hidden" name="doctorId"></Field>
                        <Field type="hidden" name="patientId"></Field>
                        <div className="mt-2 mb-2 text-dark">
                          Case Fees = {this.state.caseFees}
                        </div>
                        <div className="mt-2 mb-2 text-dark">
                          Total Bill = {this.state.totalBill}
                        </div>
                        <button type="submit" className="btn btn-danger">
                          Generate Bill
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h4 className="mt-4 mb-3">Past Appointments</h4>
            {this.state.pastAppointments.length ? (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Appointment Id</th>
                      <th>Date</th>
                      <th>Prescription</th>
                      <th>Medicines</th>
                      <th>Total Bill</th>
                      <th>More Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td>
                          {moment(appointment.timestamp).format("DD-MMM-YYYY")}
                        </td>
                        <td>{appointment.prescription}</td>
                        <td>{appointment.medicines[0]}</td>
                        <td>{appointment.totalBill}</td>
                        <td>
                          <button
                            onClick={() =>
                              this.ViewAppointmentDetailPage(appointment.id)
                            }
                            className="btn btn-info"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              "No Past Appointments"
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default AppointmentComponent;
