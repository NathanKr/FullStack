import React from "react";
import LoaderButton from './CommonUI/LoaderButton';

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
      <i
        className="glyphicon glyphicon-arrow-up"
        onClick={() => {
          props.arrowUpHandler();
        }}
      />
      <i
        className="glyphicon glyphicon-arrow-down"
        onClick={() => {
          props.arrowDownHandler();
        }}
      />
      <br />
      {/* --- remove disabled when redux is used */}
      <button className="btn btn-sm btn-secondary" disabled>
        undo
      </button>
      {/* --- remove disabled when redux is used */}
      <button className="btn btn-sm btn-secondary" disabled>
        redo
      </button>
      <br />
      <LoaderButton
        texts = {props.saveTexts}
        loadingModes = {props.saveLoadingModes}
        loadHandler={() => {
          props.saveToServer();
        }}
      >
        save
      </LoaderButton>
    </div>
  );
}

export default Editor;
