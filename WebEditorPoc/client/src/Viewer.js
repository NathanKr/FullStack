import React, { Component } from "react";
import Editor from "./Editor";
import "./Viewer.css";
import axios from "axios";
import constants from "./constants";
import Utils from "./Utils";

class Viewer extends Component {
  state = {
    arP: [],
    currentIndex: null,
    loading: false
  };

  isDirty = false; // any crud on any element from last save

  componentDidMount() {
    const url = `${constants.url}\\${constants.getArP}`;
    this.setState({ ...this.state, loading: true });
    axios
      .get(url)
      .then(response => {
        console.log("get data from server", response.data);
        this.setState({ ...this.state, arP: response.data, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ ...this.state, loading: false });
      });
  }

  render() {
    const elements = this.state.arP.map((it, index) => (
      <p
        key={index} // correct when item is not removed
        style={it.style}
        onClick={() => {
          this.setState({ ...this.state, currentIndex: index });
        }}
      >
        {it.text}
      </p>
    ));

    const currentElement = this.state.arP[this.state.currentIndex];

    return (
      <div className="Viewer">
        {this.state.loading ? <h2>processing...</h2> : ""}
        {elements}
        {this.state.currentIndex !== null ? (
          <Editor
            text={currentElement.text}
            style={currentElement.style}
            saveToServer={() => {
              const url = `${constants.url}\\${constants.setArP}`;
              const body = this.state.arP;
              this.setState({ ...this.state, loading: true });
              axios
                .post(url, body)
                .then(response => {
                  this.setState({ ...this.state, loading: false });
                  console.log("success : ", response);
                })
                .catch(err => {
                  console.log("error : ", err);
                  this.setState({ ...this.state, loading: false });
                });
            }}
            addAfterCurrentHandler={() => {
              // --- add new p to array
              let new_arP = [...this.state.arP];
              const newIndex = this.state.currentIndex + 1;
              new_arP.splice(newIndex, 0, { ...constants.defaultP });
              this.setState({
                ...this.state,
                arP: new_arP,
                currentIndex: newIndex
              });
            }}
            removeCurrentHandler={() => {
              // --- remove from array
              let new_arP = [...this.state.arP];
              new_arP.splice(this.state.currentIndex, 1);
              this.setState({
                ...this.state,
                arP: new_arP,
                currentIndex: null
              });
            }}
            arrowDownHandler={() => {
              let new_arP = [...this.state.arP];
              let newCurrentIndex = Utils.MoveDown(
                new_arP,
                this.state.currentIndex
              );
              this.setState({
                ...this.state,
                arP: new_arP,
                currentIndex: newCurrentIndex
              });
            }}
            arrowUpHandler={() => {
              let new_arP = [...this.state.arP];
              let newCurrentIndex = Utils.MoveUp(
                new_arP,
                this.state.currentIndex
              );
              this.setState({
                ...this.state,
                arP: new_arP,
                currentIndex: newCurrentIndex
              });
            }}
            onChangeText={text => {
              let new_arP = [...this.state.arP];
              new_arP[this.state.currentIndex].text = text;
              this.setState({ ...this.state, arP: new_arP });
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
