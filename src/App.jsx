import React from "react";
import DrawComp from "./DrawBQB.jsx";
import LightSignGif from "./lightSignGif.jsx";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/draw">
          <DrawComp />
        </Route>
        <Route path="/gif">
          <LightSignGif />
        </Route>
        <Route path="/">
          <nav>
            <ul>
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/gif">打call图生成</Link>
              </li>
              <li>
                <Link to="/draw">梗图生成</Link>
              </li>
            </ul>
          </nav>
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
