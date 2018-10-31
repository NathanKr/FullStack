import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Courses from "./Courses";
import News from "./News";
import Contact from "./Contact";
import Recommendations from "./Recommendations";
import TopMenu from "./TopMenu";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <TopMenu/>
          <Switch >
            <Route exact path="/" component={Home} />
            <Route exact path="/Courses" component={Courses} />
            <Route exact path="/Recommendations" component={Recommendations} />
            <Route exact path="/News" component={News} />
            <Route exact path="/Contact" component={Contact} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
