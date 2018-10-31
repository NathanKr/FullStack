import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Viewer from "./Viewer";
import Page1 from "./Page1";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ textAlign: "center" }}>
          <Link to={"/"}>Page1</Link> <Link to={"/Viewer"}>Viewer</Link>
          <hr />
          <Switch>
            <Route exact path="/" component={Page1} />
            <Route exact path="/Viewer" component={Viewer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
