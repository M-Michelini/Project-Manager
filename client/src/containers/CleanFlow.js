import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "../components/Landing";

import "./CleanFlow.css";

class CleanFlow extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
        </div>
      </Router>
    );
  }
}

export default CleanFlow;
