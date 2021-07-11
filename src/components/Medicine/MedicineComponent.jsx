import React, { Component } from "react";
import VerticalNavComponent from "../hms/VerticalNavComponent";
import MedicineDataService from "../../api/hms/MedicineDataService.js";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import { DoctorUsername } from "../../api/hms/static/configurations";
function validateValue(value) {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
}

class MedicineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      companyName: "",
      sellPrice: "",
      costPrice: "",
      medicineType: "",
      mfg: "",
      bestBefore: "",
      availableStock: "",
    };
    this.onSubmitMedicine = this.onSubmitMedicine.bind(this);
  }

  onSubmitMedicine(values) {
    let medicine = this.state;
    medicine.name = values.name;
    medicine.companyName = values.companyName;
    medicine.sellPrice = values.sellPrice;
    medicine.costPrice = values.costPrice;
    medicine.medicineType = values.medicineType;
    medicine.mfg = values.mfg;
    medicine.bestBefore = values.bestBefore;
    medicine.availableStock = values.availableStock;
    if (this.state.id === -1) {
      MedicineDataService.createMedicine(DoctorUsername, medicine).then(() => {
        this.props.history.push(`/hms/${DoctorUsername}/medicines`);
      });
    } else {
      MedicineDataService.updateMedicine(DoctorUsername, medicine).then(() => {
        this.props.history.push(`/hms/${DoctorUsername}/medicines`);
      });
    }
  }
  componentDidMount() {
    if (parseInt(this.state.id) === -1) {
      return;
    } else {
      MedicineDataService.retrieveMedicine(DoctorUsername, this.state.id).then(
        (response) =>
          this.setState({
            name: response.data.name,
            companyName: response.data.companyName,
            sellPrice: response.data.sellPrice,
            costPrice: response.data.costPrice,
            medicineType: response.data.medicineType,
            mfg: response.data.mfg,
            bestBefore: response.data.bestBefore,
            availableStock: response.data.availableStock,
          })
      );
    }
  }
  render() {
    let name = this.state.name;
    let companyName = this.state.companyName;
    let sellPrice = this.state.sellPrice;
    let costPrice = this.state.costPrice;
    let medicineType = this.state.medicineType;
    let mfg = moment(this.state.mfg).format("YYYY-MM-DD");
    let bestBefore = this.state.bestBefore;
    let availableStock = this.state.availableStock;

    return (
      <div className="row content no-gutters">
        <VerticalNavComponent />
        <div className="col-sm-10 border-left relativePosition">
          <div>
            <h3 className="mt-4 mb-5">Update/Add Medicine</h3>
            <div className="container text-left">
              <Formik
                initialValues={{
                  name,
                  companyName,
                  sellPrice,
                  costPrice,
                  medicineType,
                  mfg,
                  bestBefore,
                  availableStock,
                }}
                onSubmit={this.onSubmitMedicine}
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
                        <label htmlFor="inputCompanyName">Company</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="inputCompanyName"
                          placeholder="Company Name"
                          name="companyName"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label htmlFor="inputCostPrice">Cost Price*</label>
                        <Field
                          type="number"
                          className="form-control"
                          id="inputCostPrice"
                          name="costPrice"
                          placeholder="Cost Price"
                          validate={validateValue}
                        />
                        {errors.costPrice && (
                          <div className="text-danger">{errors.costPrice}</div>
                        )}
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputSellPrice">Sell Price*</label>
                        <Field
                          type="number"
                          className="form-control"
                          id="inputSellPrice"
                          name="sellPrice"
                          placeholder="Sell Price"
                          validate={validateValue}
                        />
                        {errors.sellPrice && (
                          <div className="text-danger">{errors.sellPrice}</div>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputMfg">MFG*</label>
                        <Field
                          type="date"
                          className="form-control"
                          id="inputMfg"
                          name="mfg"
                          placeholder="MM/DD/YYYY"
                          validate={validateValue}
                        />
                        {errors.mfg && (
                          <div className="text-danger">{errors.mfg}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputAvailableStock">
                          Available Stock*
                        </label>
                        <Field
                          type="number"
                          className="form-control"
                          id="inputAvailableStock"
                          name="availableStock"
                          placeholder="Available Stock"
                          validate={validateValue}
                        />
                        {errors.availableStock && (
                          <div className="text-danger">
                            {errors.availableStock}
                          </div>
                        )}
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputBestBefore">
                          Best Before (in Months)
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="inputBestBefore"
                          name="bestBefore"
                          placeholder="Best Before"
                        />
                      </div>
                      <div className="form-group col-md-5">
                        <label htmlFor="inputMedicineType">Medicine Type</label>
                        <Field
                          className="form-control"
                          as="select"
                          name="medicineType"
                        >
                          <option></option>
                          <option value="capsule">Capsule</option>
                          <option value="tube">Tube</option>
                          <option value="bottle">Bottle</option>
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
export default MedicineComponent;
