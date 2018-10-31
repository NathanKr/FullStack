import React, { Component } from "react";
import Editor from "./Editor";
import "./Viewer.css";
import axios from "axios";
import constants from "./constants";
import Utils from "./Utils";
import loadingModes from "./CommonUI/LoadingModes";

class Viewer extends Component {
  state = {
    arP: [],
    currentIndex: null,
    loading: false, // get
    saveLoadingModes: loadingModes.none, // set
    error: null
  };

  
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
        this.setState({ ...this.state, loading: false, error: err.message });
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
    const errorElement = this.state.error ? (
      <h2
        style={{ color: "red" }}
        onClick={() => {
          this.setState({ ...this.state, error: null }); //click to remove
        }}
      >
        {this.state.error}
      </h2>
    ) : (
      ""
    );

    return (
      <div className="Viewer">
        {errorElement}
        {this.state.loading ? <h2>processing...</h2> : ""}
        {elements}
        {this.state.currentIndex !== null ? (
          <Editor
            // *************  page specific *************
            text={currentElement.text}
            style={currentElement.style}
            onChangeFontSize={fontSize => {
              let new_arP = [...this.state.arP];
              new_arP[this.state.currentIndex].style = { fontSize: fontSize };
              this.setState({
                arP: new_arP,
                ...this.state,
                saveLoadingModes: loadingModes.none
              });
            }}
            onChangeText={text => {
              let new_arP = [...this.state.arP];
              new_arP[this.state.currentIndex].text = text;
              this.setState({
                ...this.state,
                arP: new_arP,
                saveLoadingModes: loadingModes.none
              });
            }}


            
            // *************  common to all pages *************
            arrayLen={this.state.arP.length}
            currentIndex={this.state.currentIndex}
            saveTexts={["Save", "Saving", "Saved"]}
            saveLoadingModes={this.state.saveLoadingModes}
            saveToServer={() => {
              const url = `${constants.url}\\${constants.setArP}`;
              const body = JSON.stringify(this.state.arP);
              this.setState({
                ...this.state,
                saveLoadingModes: loadingModes.loading
              });
              axios
                .post(url, body)
                .then(response => {
                  this.setState({
                    ...this.state,
                    saveLoadingModes: loadingModes.finished
                  });
                  console.log("success : ", response);
                })
                .catch(err => {
                  console.log("error : ", err);
                  this.setState({
                    ...this.state,
                    saveLoadingModes: loadingModes.none,
                    error: err.message
                  });
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
                currentIndex: newIndex,
                saveLoadingModes: loadingModes.none
              });
            }}
            removeCurrentHandler={() => {
              // --- remove from array
              let new_arP = [...this.state.arP];
              new_arP.splice(this.state.currentIndex, 1);
              this.setState({
                ...this.state,
                arP: new_arP,
                currentIndex: null,
                saveLoadingModes: loadingModes.none
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
                currentIndex: newCurrentIndex,
                saveLoadingModes: loadingModes.none
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
                currentIndex: newCurrentIndex,
                saveLoadingModes: loadingModes.none
              });
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
