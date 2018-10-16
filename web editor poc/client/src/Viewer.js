import React, { Component } from "react";
import Editor from "./Editor";
import './Viewer.css';

class Viewer extends Component {
  state = {
    arP: [
      { text: "p1", style: { fontSize: "18px" } },
      { text: "p2", style: { fontSize: "10px" } }
    ],
    currentIndex: null
  };
  render() {
    const elements = this.state.arP.map((it, index) => (
      <p
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
      <div className='Viewer'>
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
