import React, { Component } from "react";
import VerticalNavComponent from "./VerticalNavComponent";
import LoginDataService from "../../api/hms/LoginDataService.js";
import WelcomePageDataService from "../../api/hms/WelcomePageDataService.js";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Chart from "react-apexcharts";
import { DoctorUsername } from "../../api/hms/static/configurations";
class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalName: "",
      name: "",
    };
  }
  componentDidMount() {
    LoginDataService.getDoctorByUsername(DoctorUsername).then((response) => {
      // console.log(response.data);
      this.setState({
        hospitalName: response.data.hospitalName,
        name: response.data.name,
      });
    });
  }
  render() {
    return (
      <div className="row content no-gutters">
        <VerticalNavComponent hospitalName={this.state.hospitalName} />
        <div className="col-sm-10 border-left relativePosition">
          <Dashboard name={this.state.name} />
        </div>
      </div>
    );
  }
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPatients: 0,
      totalMedicines: 0,
      totalAppointments: 0,
      options: {},
      series: [13, 2],
      labels: ["New", "Old"],

      options2: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "March",
            "April",
            "May",
          ],
        },
      },
      series2: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  }
  componentDidMount() {
    WelcomePageDataService.retriveTotalPatients(DoctorUsername).then(
      (response) => {
        this.setState({
          totalPatients: response.data,
        });
      }
    );
    WelcomePageDataService.retriveTotalMedicines(DoctorUsername).then(
      (response) => {
        this.setState({
          totalMedicines: response.data,
        });
      }
    );
    WelcomePageDataService.retriveTotalAppointments(DoctorUsername).then(
      (response) => {
        this.setState({
          totalAppointments: response.data,
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-4 mb-5">Welcome Dr. {this.props.name}</h3>
        <div className="row mb-5">
          <CardComponent
            total={this.state.totalPatients}
            title={"Patients"}
            icon={<PeopleAltIcon className="svg_icons" />}
            color="text-primary"
          />
          <CardComponent
            total={this.state.totalMedicines}
            title={"Medicines"}
            icon={<LocalPharmacyIcon className="svg_icons" />}
            color="text-danger"
          />
          <CardComponent
            total={this.state.totalAppointments}
            title={"Appointments"}
            icon={<ContactPhoneIcon className="svg_icons" />}
            color="text-info"
          />
          <CardComponent
            total={this.state.totalPatients}
            title={"Website Visits"}
            icon={<VisibilityIcon className="svg_icons" />}
            color="text-warning"
          />
        </div>
        <div className="row mt-4">
          <div className="col-sm-6">
            <div className="card">
              <h5 className="card-header">Monthly Statistics</h5>
              <div className="card-body">
                <Chart
                  options={this.state.options2}
                  series={this.state.series2}
                  type="line"
                  width="500"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <h5 className="card-header">Patient Statistics</h5>
              <div className="card-body">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  labels={this.state.labels}
                  type="donut"
                  width="450"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class CardComponent extends Component {
  render() {
    return (
      <div className="col-sm-3 ">
        <div className="card shadow border-0">
          <div className="card-body">
            <div className="row">
              <div className={`col-sm-4 center-div ${this.props.color}`}>
                {this.props.icon}
              </div>
              <div className="col-sm-8 text-right">
                <h6 className="card-title">{this.props.title}</h6>
                <h4 className="card-text">{this.props.total}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default WelcomeComponent;
