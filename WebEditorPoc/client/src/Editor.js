import React from "react";
import LoaderButton from "./CommonUI/LoaderButton";

function Editor(props) {
  const buttonClassName = "btn btn-sm";
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
      <button
        className={buttonClassName}
        onClick={() => {
          props.addAfterCurrentHandler();
        }}
      >add</button>
      <button
        className={buttonClassName} disabled={props.arrayLen === 0}
        onClick={() => {
          props.removeCurrentHandler();
        }}
      >remove</button>
      <br />
      <button
        className={buttonClassName}
        disabled={props.currentIndex === 0}
        onClick={() => {
          props.arrowUpHandler();
        }}
      >
        up
      </button>
      <button
        className={buttonClassName}
        disabled={props.currentIndex === props.arrayLen - 1}
        onClick={() => {
          props.arrowDownHandler();
        }}
      >
        down
      </button>
      <br />
      {/* --- remove disabled when redux is used */}
      <button className={buttonClassName} disabled>
        undo
      </button>
      {/* --- remove disabled when redux is used */}
      <button className={buttonClassName} disabled>
        redo
      </button>
      <br />
      <LoaderButton
        texts={props.saveTexts}
        loadingModes={props.saveLoadingModes}
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
