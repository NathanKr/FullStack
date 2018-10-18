import React from "react";

function Editor(props) {
  return (
    <div>
      text :{" "}
      <input
        onChange={evt => {
          props.onChangeText(evt.target.value);
        }}
        value={props.text}
      />
      <br />
      font size [px] :{" "}
      <input
        type="number"
        value={props.style.fontSize.replace("px", "")}
        onChange={evt => {
          props.onChangeFontSize(`${evt.target.value}px`);
        }}
      />
      <br />
      <i
        className="glyphicon glyphicon-plus"
        onClick={() => {
          props.addAfterCurrentHandler();
        }}
      />
      <i
        className="glyphicon glyphicon-remove"
        onClick={() => {
          props.removeCurrentHandler();
        }}
      />
      <br />
      <button>undo</button>
      <button>redo</button>
      <br />
      <i className="glyphicon glyphicon-save" />
    </div>
  );
}

export default Editor;
