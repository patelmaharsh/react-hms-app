import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import PatientDataService from "../../api/hms/PatientDataService.js";
import VerticalNavComponent from "../hms/VerticalNavComponent";
import { DoctorUsername } from "../../api/hms/static/configurations";
function validateValue(value) {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
}

class PatientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      age: 0,
      city: "",
      gender: "",
      phone: "",
      email: "",
      isTokenExpired: false,
      registerDate: moment().format(),
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    let patient = this.state;
    patient.name = values.name;
    patient.city = values.city;
    patient.age = values.age;
    patient.phone = values.phone;
    patient.gender = values.gender;
    patient.email = values.email;
    if (this.state.id === -1) {
      PatientDataService.createPatient(DoctorUsername, patient).then(() => {
        this.props.history.push(`/hms/${DoctorUsername}/patients`);
      });
    } else {
      PatientDataService.updatePatient(DoctorUsername, patient).then(() => {
        this.props.history.push(`/hms/${DoctorUsername}/patients`);
      });
    }
  }
  componentDidMount() {
    if (parseInt(this.state.id) === -1) {
      return;
    } else {
      PatientDataService.retrievePatient(DoctorUsername, this.state.id).then(
        (response) =>
          this.setState({
            name: response.data.name,
            age: response.data.age,
            city: response.data.city,
            gender: response.data.gender,
            phone: response.data.phone,
            email: response.data.email,
            isTokenExpired: response.data.isTokenExpired,
            registerDate: response.data.registerDate,
          })
      );
    }
  }
  render() {
    let name = this.state.name;
    let registerDate = this.state.registerDate;
    let city = this.state.city;
    let age = this.state.age;
    let phone = this.state.phone;
    let gender = this.state.gender;
    let email = this.state.email;
    return (
      <div className="row content no-gutters">
        <VerticalNavComponent />
        <div className="col-sm-10 border-left relativePosition">
          <div>
            <h3 className="mt-4 mb-5">Update/Add Patient</h3>

            <div className="container text-left">
              <Formik
                initialValues={{
                  name,
                  registerDate,
                  city,
                  age,
                  phone,
                  gender,
                  email,
                }}
                onSubmit={this.onSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                enableReinitialize={true}
              >
                {({ errors, touched, validateField, validateForm }) => (
                  <Form>
                    <div className="form-row mt-5">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputName">Name*</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="Name"
                          name="name"
                          validate={validateValue}
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City*</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="inputCity"
                          placeholder="City"
                          name="city"
                          validate={validateValue}
                        />
                        {errors.city && (
                          <div className="text-danger">{errors.city}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-5">
                        <label htmlFor="inputRegisterDate">Register Date</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="inputRegisterDate"
                          name="registerDate"
                          value={moment(registerDate).format("DD-MM-YYYY")}
                          disabled
                        />
                      </div>
                      <div className="form-group col-md-5">
                        <label htmlFor="inputPhone">Phone</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="inputPhone"
                          name="phone"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="inputAge">Age</label>
                        <Field
                          type="number"
                          className="form-control"
                          id="inputAge"
                          name="age"
                          placeholder="Age"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <Field
                          type="email"
                          className="form-control"
                          id="inputEmail"
                          placeholder="Email"
                          name="email"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputGender">Gender</label>
                        <Field
                          className="form-control"
                          as="select"
                          name="gender"
                        >
                          <option></option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Field>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientComponent;
