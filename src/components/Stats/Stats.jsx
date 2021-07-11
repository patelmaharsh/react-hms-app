import React, { Component } from "react";
import StatsDataService from "../../api/hms/StatsDataService";
import VerticalNavComponent from "../hms/VerticalNavComponent";
class StatsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentIncome: "",
      medicineIncome: "",
      totalIncome: "",
    };
  }
  componentDidMount() {
    let username = sessionStorage.getItem("authenticatedUser");
    StatsDataService.retriveCaseFees(username).then((response) => {
      this.setState({
        appointmentIncome: response.data,
      });
    });
    StatsDataService.retriveMedicineBills(username).then((response) => {
      this.setState({
        medicineIncome: response.data,
      });
    });
    StatsDataService.retriveAllBills(username).then((response) => {
      this.setState({
        totalIncome: response.data,
      });
    });
  }
  render() {
    return (
      <div className="row content no-gutters">
        <VerticalNavComponent hospitalName={this.state.hospitalName} />
        <div className="col-sm-10 border-left relativePosition">
          <h4 className="mt-4 mb-5">Stats</h4>
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="card">
                  <h5 className="card-header">Income from Appointment Fees</h5>
                  <div className="card-body">
                    <span>{this.state.appointmentIncome}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <h5 className="card-header">Income from Medicines</h5>
                  <div className="card-body">
                    <span>{this.state.medicineIncome}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <h5 className="card-header">Total Income</h5>
                  <div className="card-body">
                    <span>{this.state.totalIncome}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StatsComponent;
