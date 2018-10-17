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
      <i className="glyphicon glyphicon-plus" />
      <br />
      <i className="glyphicon glyphicon-remove" />
    </div>
  );
}

export default Editor;
