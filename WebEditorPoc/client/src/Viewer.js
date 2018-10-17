import React, { Component } from "react";
import Editor from "./Editor";
import "./Viewer.css";
import axios from "axios";
import constants from "./constants";

class Viewer extends Component {
  state = {
    arP: [],
    currentIndex: null
  };

  componentDidMount() {
    const url = `${constants.url}\\${constants.getArP}`;
    axios
      .get(url)
      .then(response => {
        console.log("data from server", response.data);
        this.setState({ arP: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const elements = this.state.arP.map((it, index) => (
      <p
        key={index} // correct when item is not removed
        style={it.style}
        onClick={() => {
          this.setState({ currentIndex: index, ...this.setState });
        }}
      >
        {it.text}
      </p>
    ));

    const currentElement = this.state.arP[this.state.currentIndex];

    return (
      <div className="Viewer">
        {elements}
        {this.state.currentIndex !== null ? (
          <Editor
            text={currentElement.text}
            style={currentElement.style}
            onChangeText={text => {
              let new_arP = [...this.state.arP];
              new_arP[this.state.currentIndex].text = text;
              this.setState({ arP: new_arP, ...this.state });
            }}
            onChangeFontSize={fontSize => {
              let new_arP = [...this.state.arP];
              new_arP[this.state.currentIndex].style = { fontSize: fontSize };
              this.setState({ arP: new_arP, ...this.state });
            }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Viewer;
