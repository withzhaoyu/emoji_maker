import React from "react";
import DrawComp from "./DrawBQB.jsx";
import GifComp from "./Gif.jsx";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/draw">
          <DrawComp />
        </Route>
        <Route path="/gif">
          <GifComp />
        </Route>
        <Route path="/">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gif">gif</Link>
              </li>
              <li>
                <Link to="/draw">draw</Link>
              </li>
            </ul>
          </nav>
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
