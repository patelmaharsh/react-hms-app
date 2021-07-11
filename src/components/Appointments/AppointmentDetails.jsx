import React, { Component } from "react";
import VerticalNavComponent from "../hms/VerticalNavComponent";
import AppointmentDataService from "../../api/hms/AppointmentDataService.js";
import PatientDataService from "../../api/hms/PatientDataService.js";
import moment from "moment";
import { DoctorUsername } from "../../api/hms/static/configurations";
class AppointmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }
  componentDidMount() {
    AppointmentDataService.retriveAllAppointments(DoctorUsername).then(
      (response) => {
        this.setState({
          appointments: response.data,
        });
      }
    );
  }
  handleViewAppointment = (id) => {
    this.props.history.push(`/hms/${DoctorUsername}/appointments/${id}`);
  };
  render() {
    const appointments = this.state.appointments;
    appointments.sort((a, b) => {
      // console.log(a.timestamp, "->", b.timestamp);
      if (a.timestamp > b.timestamp) return -1;
      return a.timestamp < b.timestamp ? 1 : 0;
    });
    return (
      <div className="row content no-gutters">
        <VerticalNavComponent />
        <div className="col-sm-10 border-left relativePosition">
          <div>
            <h3 className="mt-4 mb-5">All Appointments</h3>
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Case Fees</th>
                    <th>Total Bill</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>

                      <AppointmentPatientDetailsComponent
                        patientId={appointment.patientId}
                      />
                      <td>
                        {moment(appointment.timestamp).format("DD-MMM-YYYY")}
                      </td>
                      <td>{appointment.caseFees}</td>
                      <td>{appointment.totalBill}</td>
                      <td>
                        <button
                          onClick={() =>
                            this.handleViewAppointment(appointment.id)
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
          </div>
        </div>
      </div>
    );
  }
}
class AppointmentPatientDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: "",
    };
  }
  componentDidMount() {
    PatientDataService.retrievePatient(
      DoctorUsername,
      this.props.patientId
    ).then((response) => {
      this.setState({
        patientName: response.data.name,
      });
    });
  }
  render() {
    return <td>{this.state.patientName}</td>;
  }
}
export default AppointmentDetails;
