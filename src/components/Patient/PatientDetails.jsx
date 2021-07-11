import moment from "moment";
import React, { Component } from "react";
import PatientDataService from "../../api/hms/PatientDataService.js";
import VerticalNavComponent from "../hms/VerticalNavComponent";
import { DoctorUsername } from "../../api/hms/static/configurations";
class PatientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      searchValue: "",
    };
    this.deletePatientClicked = this.deletePatientClicked.bind(this);
    this.refreshPatients = this.refreshPatients.bind(this);
    this.updatePatientClicked = this.updatePatientClicked.bind(this);
    this.onChange = this.onChange.bind(this);
    this.appointmentClicked = this.appointmentClicked.bind(this);
  }
  componentDidMount() {
    this.refreshPatients();
  }
  refreshPatients() {
    PatientDataService.retrieveAllPatients(DoctorUsername).then((response) => {
      // console.log(response);
      this.setState({
        patients: response.data,
      });
    });
  }

  render() {
    const search = this.state.searchValue;
    const filteredPatientsByName = this.state.patients.filter((patient) => {
      return patient.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    const filteredPatientsByCity = this.state.patients.filter((patient) => {
      return patient.city.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    let filteredPatients = filteredPatientsByName
      .concat(filteredPatientsByCity)

      .sort((a, b) => {
        if (a.city < b.city) return -1;
        return a.city > b.city ? 1 : 0;
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        return a.name > b.name ? 1 : 0;
      });
    filteredPatients = [...new Set(filteredPatients)];
    return (
      <div className="row content no-gutters">
        <VerticalNavComponent />
        <div className="col-sm-10 border-left relativePosition">
          <div>
            <h3 className="mt-4 mb-5">Manage Patients</h3>

            <div className="container mb-4">
              <div className="input-group">
                <div className="row w-100">
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for Name/City"
                      value={this.state.searchValue}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {filteredPatients.length ? (
              <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>City</th>
                      <th>Age</th>
                      <th>Register Date</th>
                      <th>Appointment</th>
                      <th>Update</th>
                      {/*<th>Delete</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.city}</td>
                        <td>{patient.age}</td>
                        <td>
                          {moment(patient.registerDate).format("DD-MM-YYYY")}
                        </td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => this.appointmentClicked(patient.id)}
                          >
                            Appointment
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              this.updatePatientClicked(patient.id)
                            }
                          >
                            Update
                          </button>
                        </td>
                        {/*<td>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              this.deletePatientClicked(patient.id)
                            }
                          >
                            Delete
                          </button>
                          </td>*/}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              "No related content"
            )}
          </div>
          <div className="h-20"></div>
        </div>
      </div>
    );
  }
  onChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  appointmentClicked(id) {
    this.props.history.push(
      `/hms/${DoctorUsername}/patients/${id}/appointment`
    );
  }
  deletePatientClicked(id) {
    PatientDataService.deletePatient(DoctorUsername, id).then((response) => {
      this.refreshPatients();
    });
  }
  updatePatientClicked(id) {
    this.props.history.push(`/hms/${DoctorUsername}/patients/${id}`);
  }
}
export default PatientDetails;
