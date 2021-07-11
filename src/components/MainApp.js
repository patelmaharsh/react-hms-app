import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HMSAPP from "./hms/hms";
class MainAppComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainAppHeaderComponent} />
          <Route path="/hms/" component={HMSAPP} />
        </Switch>
      </Router>
    );
  }
}

export class MainAppHeaderComponent extends Component {
  render() {
    return (
      <div>
        <h2 className="mt-4 mb-5">This is Maharsh Patel's website</h2>

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="card">
                <img
                  className="card-img-top"
                  height="220"
                  src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Predictive Maintenance System</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="/hms/login/" className="btn btn-primary">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <img
                  className="card-img-top"
                  height="220"
                  src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG9zcGl0YWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Clinic Management System</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="/hms/login/" className="btn btn-primary">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <img
                  className="card-img-top"
                  height="220"
                  src="https://images.unsplash.com/photo-1605792657660-596af9009e82?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGV0aGVyaXVtJTIwYmxvY2tjaGFpbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Decentralized Crop Insurance</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="/abc/" className="btn btn-primary">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainAppComponent;
