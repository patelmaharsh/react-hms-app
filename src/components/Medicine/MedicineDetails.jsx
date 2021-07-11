import React, { Component } from "react";
// import moment from "moment";
import MedicineDataService from "../../api/hms/MedicineDataService.js";
import VerticalNavComponent from "../hms/VerticalNavComponent";
import { DoctorUsername } from "../../api/hms/static/configurations";
class MedicineDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [],
      searchValue: "",
    };
    this.onChange = this.onChange.bind(this);
    this.updateMedicineClicked = this.updateMedicineClicked.bind(this);
    this.deleteMedicineClicked = this.deleteMedicineClicked.bind(this);
  }
  componentDidMount() {
    this.refreshMedicines();
  }
  refreshMedicines() {
    MedicineDataService.retrieveAllMedicines(DoctorUsername).then(
      (response) => {
        this.setState({
          medicines: response.data,
        });
      }
    );
  }
  render() {
    const search = this.state.searchValue;
    const filteredMedicinesByName = this.state.medicines.filter((medicine) => {
      return medicine.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    const filteredMedicinesByType = this.state.medicines.filter((medicine) => {
      return (
        medicine.medicineType.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
    let filteredMedicines = filteredMedicinesByName
      .concat(filteredMedicinesByType)
      .sort((a, b) => {
        if (a.name > b.name) return -1;
        return a.name < b.name ? 1 : 0;
      });
    filteredMedicines = [...new Set(filteredMedicines)];
    return (
      <div className="row content no-gutters">
        <VerticalNavComponent />
        <div className="col-sm-10 border-left relativePosition">
          <div className="container">
            <h3 className="mt-4 mb-5">Manage Medicines</h3>
            <div className="container mb-4">
              <div className="input-group">
                <div className="row w-100">
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for..."
                      value={this.state.searchValue}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {filteredMedicines.length ? (
              <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Company Name</th>
                      <th>Medicine Type</th>
                      <th>Stock Available</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>{medicine.id}</td>
                        <td>{medicine.name}</td>
                        <td>{medicine.companyName}</td>
                        <td>{medicine.medicineType}</td>
                        <td>{medicine.availableStock}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              this.updateMedicineClicked(medicine.id)
                            }
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              this.deleteMedicineClicked(medicine.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              "No related content"
            )}
          </div>
        </div>
      </div>
    );
  }
  onChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  updateMedicineClicked(id) {
    this.props.history.push(`/hms/${DoctorUsername}/medicines/${id}`);
  }
  deleteMedicineClicked(id) {
    MedicineDataService.deleteMedicine(DoctorUsername, id).then((response) => {
      this.refreshMedicines();
    });
  }
}
export default MedicineDetails;
