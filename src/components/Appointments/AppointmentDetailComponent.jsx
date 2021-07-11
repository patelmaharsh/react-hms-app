import React, { Component } from "react";
import AppointmentDataService from "../../api/hms/AppointmentDataService";
import VerticalNavComponent from "../hms/VerticalNavComponent";
import { DoctorUsername } from "../../api/hms/static/configurations";
class AppointmentDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.appointmentid,
      patientId: "",
      doctorId: "",
      medicines: "",
      caseFees: "",
      totalBill: "",
      prescription: "",
    };
  }
  componentDidMount() {
    AppointmentDataService.retriveAppointmentByAppointmentId(
      DoctorUsername,
      this.state.id
    ).then((response) => {
      this.setState({
        patientId: response.data.patientId,
        doctorId: response.data.doctorId,
        medicines: response.data.medicines,
        caseFees: response.data.caseFees,
        totalBill: response.data.totalBill,
        prescription: response.data.prescription,
      });
    });
  }
  render() {
    return (
      <div className="row content no-gutters">
        <VerticalNavComponent hospitalName={this.state.hospitalName} />
        <div className="col-sm-10 border-left relativePosition">
          <h4 className="mt-4 mb-5">
            Appointment Details with Id : {this.state.id}
          </h4>
          <div className="container">
            <div className="mt-2 mb-2 row">
              <div className="col-sm-2">
                <label>Patient Id:</label>
              </div>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.patientId}
                  disabled
                />
              </div>
              <div className="col-sm-2">
                <label>Doctor Id:</label>
              </div>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.doctorId}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <label>Casefees:</label>
              </div>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.caseFees}
                  disabled
                />
              </div>
              <div className="col-sm-2">
                <label>Totalfees:</label>
              </div>
              <div className="col-sm-3">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.totalBill}
                  disabled
                />
              </div>
            </div>
            <div className="container mt-5 mb-4">
              <table className="table table-striped w-50">
                <thead>
                  <tr>
                    <th scope="col">Medicine</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.state.medicines).map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{this.state.medicines[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AppointmentDetailComponent;
