import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import NonAuthenticatedRoute from "./NonAuthenticatedRoute.jsx";
import PatientDetails from "../Patient/PatientDetails";
import LoginComponent from "./LoginComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponet";
import { MainAppHeaderComponent } from "../MainApp";
import PatientComponent from "../Patient/PatientComponent";
import AuthenticationService from "./AuthenticationService";
import MedicineDetails from "../Medicine/MedicineDetails";
import MedicineComponent from "../Medicine/MedicineComponent";
import AppointmentDetails from "../Appointments/AppointmentDetails";
import AppointmentComponent from "../Patient/Appointment";
import AppointmentDetailComponent from "../Appointments/AppointmentDetailComponent";
import StatsComponent from "../Stats/Stats";

class HMSAPP extends Component {
  render() {
    return (
      <Router>
        <div className="box">
          {!AuthenticationService.isUserLoggedIn() && <HeaderComponent />}
          <Switch>
            <Route exact path="/" component={MainAppHeaderComponent}></Route>

            <NonAuthenticatedRoute
              path="/hms/login"
              component={LoginComponent}
            ></NonAuthenticatedRoute>
            <AuthenticatedRoute
              path="/hms/:username"
              exact
              component={WelcomeComponent}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/hms/:username/patients"
              component={PatientDetails}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/hms/:username/patients/:id"
              component={PatientComponent}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/hms/:username/patients/:id/appointment"
              component={AppointmentComponent}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/hms/:username/medicines"
              component={MedicineDetails}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              path="/hms/:username/medicines/:id"
              component={MedicineComponent}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/hms/:username/appointments"
              component={AppointmentDetails}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/hms/:username/appointments/:appointmentid"
              component={AppointmentDetailComponent}
            ></AuthenticatedRoute>
            <AuthenticatedRoute
              exact
              path="/hms/:username/stats"
              component={StatsComponent}
            ></AuthenticatedRoute>
            <Route component={ErrorComponent}></Route>
          </Switch>
          <div className="extra-footer-space"></div>
          <FooterComponent />
        </div>
      </Router>
    );
  }
}

export default HMSAPP;
