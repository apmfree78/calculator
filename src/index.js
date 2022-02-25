import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../node_modules/bootstrap/scss/bootstrap-grid.scss";
import "./css/style.css";

render(<App />, document.querySelector("#main"));
