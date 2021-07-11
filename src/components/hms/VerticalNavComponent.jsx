import { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { DoctorUsername } from "../../api/hms/static/configurations";
class VerticalNavComponent extends Component {
  render() {
    return (
      <div className="col-2 fixedPosition bg-dark h-100">
        <div className="verticalNav">
          <div className="list-group">
            <div className="bg-dark text-light profile-section">
              <AccountCircleIcon className=" profile_icons" />
            </div>
            <Link
              to={`/hms/${DoctorUsername}`}
              className="list-group-item list-group-item-action bg-dark text-light"
            >
              {"Shivam Ano Care"}
            </Link>
            <Link
              to={`/hms/${DoctorUsername}/patients`}
              className="list-group-item list-group-item-action bg-dark text-light"
            >
              Manage Patients
            </Link>
            <Link
              to={`/hms/${DoctorUsername}/patients/${parseInt(-1)}`}
              className="list-group-item list-group-item-action bg-dark text-light"
            >
              Add Patient
            </Link>
            <Link
              to={`/hms/${DoctorUsername}/medicines`}
              className="list-group-item list-group-item-action bg-dark text-light"
            >
              Manage Medicines
            </Link>
            <Link
              to={`/hms/${DoctorUsername}/medicines/${parseInt(-1)}`}
              className="list-group-item list-group-item-action bg-dark text-light"
            >
              Add Medicine
            </Link>
            <Link
              to={`/hms/${DoctorUsername}/appointments`}
              className="list-group-item list-group-item-action bg-dark text-light"
            >
              Appointments
            </Link>
            <Link
              to={`/hms/${DoctorUsername}/stats`}
              className="list-group-item list-group-item-action bg-dark text-light"
            >
              Stats
            </Link>
            <a
              href="/hms/logout"
              className="list-group-item list-group-item-action bg-dark text-danger"
              onClick={AuthenticationService.logout}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default VerticalNavComponent;
