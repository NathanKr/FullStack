import React from "react";
import "./LoaderButton.css";
import loadingModes from "./LoadingModes";

function LoaderButton(props) {
  return (
    <button
      className="btn btn-sm btn-secondary"
      disabled={props.loadingModes !== loadingModes.none}
      onClick={props.loadHandler}
    >
      {props.texts[props.loadingModes]}
      {props.loadingModes === loadingModes.loading ? (
        <div className="loader" />
      ) : (
        ""
      )}{" "}
    </button>
  );
}

export default LoaderButton;
