import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./styles.less";
import "./font.css";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
